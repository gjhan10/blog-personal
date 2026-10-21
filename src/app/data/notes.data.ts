export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang: string; code: string };

export interface Note {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  body: Block[];
}

export interface Segment {
  text: string;
  kind: 'text' | 'code' | 'strong';
}

export function segments(text: string): Segment[] {
  return text
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part): Segment => {
      if (part.startsWith('`')) return { text: part.slice(1, -1), kind: 'code' };
      if (part.startsWith('**')) return { text: part.slice(2, -2), kind: 'strong' };
      return { text: part, kind: 'text' };
    });
}

export function readingMinutes(note: Note): number {
  const text = note.body
    .map((b) => {
      switch (b.type) {
        case 'ul':
        case 'ol':
          return b.items.join(' ');
        case 'code':
          return '';
        default:
          return b.text;
      }
    })
    .join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

export const NOTES: Note[] = [
  {
    slug: 'angular-en-github-pages',
    title: 'Angular en GitHub Pages sin que se rompan las rutas',
    date: '2026-10-19',
    category: 'Angular',
    tags: ['Angular', 'GitHub Pages', 'Despliegue'],
    summary:
      'Por qué recargar una ruta profunda da 404 en GitHub Pages y cómo resolverlo con prerender estático y un 404.html de respaldo.',
    body: [
      {
        type: 'p',
        text: 'GitHub Pages sirve archivos estáticos. Si abres `/proyectos` directamente, busca una carpeta `proyectos/index.html`; si no existe, responde 404. Una SPA de Angular no genera esos archivos por defecto, así que navegar con el router funciona pero **recargar** la página falla.',
      },
      { type: 'h2', text: 'Dos piezas que lo resuelven' },
      {
        type: 'ol',
        items: [
          '**Prerender estático.** Con el builder `application` y `outputMode: "static"`, Angular genera un `index.html` por ruta conocida. Esas rutas ya no dependen de ningún fallback.',
          '**Un `404.html` con el shell cliente.** Para las rutas que no se prerenderizan, GitHub Pages devuelve `404.html`. Si ese archivo es una copia de `index.csr.html` (la app sin contenido renderizado), Angular arranca y el router resuelve la ruta en el navegador.',
        ],
      },
      { type: 'h2', text: 'La URL base' },
      {
        type: 'p',
        text: 'El sitio vive en `https://usuario.github.io/repositorio/`, no en la raíz. En producción hay que compilar con `baseHref` igual a `/repositorio/`, y en desarrollo mantener `/`. En `angular.json` se declara solo en la configuración `production`.',
      },
      { type: 'h2', text: 'Qué comprobar después de publicar' },
      {
        type: 'ul',
        items: [
          'Recarga una ruta profunda y una ruta inexistente.',
          'Revisa que los assets cargan con la ruta base (`/repositorio/assets/...`).',
          'Verifica que el repositorio tiene un archivo `.nojekyll`.',
        ],
      },
      {
        type: 'quote',
        text: 'Los archivos que empiezan con guion bajo se ignoran si Jekyll está activo. `.nojekyll` evita ese comportamiento.',
      },
    ],
  },
  {
    slug: 'inyeccion-por-constructor',
    title: 'Inyección por constructor en Spring, y por qué la prefiero',
    date: '2026-10-19',
    category: 'Spring Boot',
    tags: ['Spring Boot', 'Java', 'Testing'],
    summary:
      'Notas sobre las diferencias prácticas entre inyección por campo y por constructor, y qué cambia al escribir pruebas.',
    body: [
      {
        type: 'p',
        text: 'Spring permite inyectar dependencias de tres formas: por campo, por setter y por constructor. La documentación oficial recomienda el constructor para las dependencias obligatorias.',
      },
      { type: 'h2', text: 'Por campo' },
      {
        type: 'code',
        lang: 'java',
        code: '@Service\npublic class OrderService {\n    @Autowired\n    private OrderRepository repository;\n}',
      },
      {
        type: 'p',
        text: 'Es corto, pero la clase no puede crearse sin Spring: para probarla hay que usar reflexión o levantar el contexto.',
      },
      { type: 'h2', text: 'Por constructor' },
      {
        type: 'code',
        lang: 'java',
        code: '@Service\npublic class OrderService {\n    private final OrderRepository repository;\n\n    public OrderService(OrderRepository repository) {\n        this.repository = repository;\n    }\n}',
      },
      {
        type: 'p',
        text: 'Con un único constructor, `@Autowired` es opcional. Las ventajas son concretas:',
      },
      {
        type: 'ul',
        items: [
          'El campo puede ser `final`: la clase queda inmutable tras construirse.',
          'Una dependencia faltante falla al arrancar, no en el primer uso.',
          'En una prueba unitaria basta `new OrderService(mockRepository)`.',
        ],
      },
      { type: 'h2', text: 'Una señal de diseño' },
      {
        type: 'p',
        text: 'Si el constructor recibe seis o siete dependencias, es probable que la clase tenga demasiadas responsabilidades. La inyección por campo oculta ese problema; el constructor lo hace visible.',
      },
    ],
  },
  {
    slug: 'mono-y-flux-modelo-mental',
    title: 'Mono y Flux: un modelo mental para empezar con WebFlux',
    date: '2026-10-19',
    category: 'WebFlux',
    tags: ['WebFlux', 'Reactor', 'Java'],
    summary:
      'Un resumen de lo que aclaré al estudiar Project Reactor: qué representan Mono y Flux y por qué nada ocurre hasta suscribirse.',
    body: [
      { type: 'p', text: 'Project Reactor ofrece dos tipos para describir flujos asíncronos de datos:' },
      {
        type: 'ul',
        items: ['`Mono<T>`: de cero a un elemento.', '`Flux<T>`: de cero a N elementos.'],
      },
      { type: 'h2', text: 'Son descripciones, no resultados' },
      {
        type: 'code',
        lang: 'java',
        code: 'Mono<String> saludo = Mono.just("hola")\n    .map(String::toUpperCase)\n    .doOnNext(s -> System.out.println("procesando " + s));',
      },
      {
        type: 'p',
        text: 'Hasta aquí **no se imprimió nada**. El pipeline es una receta; se ejecuta cuando alguien se suscribe, por ejemplo `saludo.subscribe()`. En un controlador WebFlux, el framework se suscribe por ti al devolver el `Mono`.',
      },
      { type: 'h2', text: 'Errores comunes' },
      {
        type: 'ol',
        items: [
          'Llamar a `block()` dentro de un pipeline reactivo: bloquea el hilo y anula el beneficio.',
          'Crear un pipeline y olvidar devolverlo o suscribirse: no se ejecuta.',
          'Mezclar acceso bloqueante (JDBC) con WebFlux sin aislarlo en un scheduler apropiado.',
        ],
      },
      { type: 'h2', text: 'Cuándo no vale la pena' },
      {
        type: 'p',
        text: 'Si la aplicación es CRUD con carga moderada y acceso a base de datos bloqueante, Spring MVC suele ser más simple de escribir y depurar. WebFlux aporta más cuando hay mucha concurrencia de entrada y salida o streaming.',
      },
    ],
  },
].sort((a, b) => b.date.localeCompare(a.date)) as Note[];

export const findNote = (slug: string) => NOTES.find((n) => n.slug === slug);
