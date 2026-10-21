import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CourseBase, CourseModule } from '../course-base';
import { CourseLayout } from '../course-layout/course-layout';
import { runJava, RunResult } from '../../core/java-runner';
import { PLAYGROUND_OUTPUTS } from './playground-outputs';
import { ModuleM1Component } from './modules/fundamentos/fundamentos';
import { ModuleM2Component } from './modules/oop/oop';
import { ModuleM3Component } from './modules/arrays/arrays';
import { ModuleM4Component } from './modules/recursividad/recursividad';
import { ModuleM5Component } from './modules/excepciones/excepciones';
import { ModuleM6Component } from './modules/genericosLamdas/genericos';
import { ModuleM7Component } from './modules/archivos/archivos';
import { ModuleM8Component } from './modules/concurrencia/concurrencia';
import { ModuleM9Component } from './modules/module-m9';

@Component({
  selector: 'curso-java',
  standalone: true,
  imports: [CourseLayout, ModuleM1Component, ModuleM2Component, ModuleM3Component, ModuleM4Component, ModuleM5Component, ModuleM6Component, ModuleM7Component, ModuleM8Component, ModuleM9Component],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./curso-java.scss'],
  templateUrl: './curso-java.html'
})
export class CursoJava extends CourseBase {
  readonly courseId = 'curso-java';
  readonly route = '/curso-java';
  readonly title = 'Java: de cero a experto';
  readonly intro = 'Java desde los fundamentos hasta las novedades de Java 24: OOP, colecciones, lambdas, concurrencia y Java moderno, con un editor para ejecutar los ejemplos.';
  readonly completeText = 'Recorriste Java desde «Hola, mundo» hasta las novedades de Java 24: fundamentos, OOP, colecciones, lambdas, concurrencia y Java moderno.';

  @ViewChild('playgroundTpl', { static: true }) playgroundTpl!: TemplateRef<unknown>;

  modules: CourseModule[] = [
    {
      badge: 'M1', title: 'Fundamentos',
      desc: 'Variables, tipos primitivos, operadores y control de flujo básico.',
      cert: 'Java SE Fundamentals', offset: 0,
      lessons: ['Introducción a Java', 'Instalación & Setup', 'Variables y Tipos', 'Operadores', 'if / else', 'switch', 'Bucles for', 'while / do-while', 'break / continue', 'Evaluación']
    },
    {
      badge: 'M2', title: 'OOP',
      desc: 'Clases, objetos, herencia, polimorfismo e interfaces.',
      cert: 'Java SE OCP Core', offset: 9,
      lessons: ['Introducción a POO', 'Clases & Objetos', 'Métodos', 'Constructores', 'Miembros estáticos', 'Abstracción', 'Encapsulamiento', 'Herencia', 'Clases Abstractas', 'Polimorfismo', 'Interfaces', 'Enumeraciones', 'Evaluación']
    },
    {
      badge: 'M3', title: 'Arrays & Colecciones',
      desc: 'Arrays 1D/2D, ArrayList, HashMap, HashSet e iteración.',
      cert: 'Java SE Collections', offset: 21,
      lessons: ['Arrays 1D', 'Arrays 2D', 'Iteración colecciones', 'ArrayList & LinkedList', 'HashMap & HashSet', 'Evaluación']
    },
    {
      badge: 'M4', title: 'Recursividad',
      desc: 'Caso base, caso recursivo, recursión directa/indirecta, memoización y trampolín.',
      cert: 'Java SE Methods', offset: 26,
      lessons: ['Recursividad', 'Evaluación']
    },
    {
      badge: 'M5', title: 'Excepciones',
      desc: 'try/catch/finally, jerarquía, excepciones custom y try-with-resources.',
      cert: 'Java SE Exceptions', offset: 28,
      lessons: ['try / catch / finally', 'Jerarquía excepciones', 'Excepciones custom', 'try-with-resources', 'Evaluación']
    },
    {
      badge: 'M6', title: 'Genéricos & Lambdas',
      desc: 'Generics, lambdas, interfaces funcionales, Stream API y Optional.',
      cert: 'Java SE Functional', offset: 32,
      lessons: ['Generics', 'Expresiones Lambda', 'Interfaces funcionales', 'Stream API', 'Optional', 'Evaluación']
    },
    {
      badge: 'M7', title: 'E/S & Archivos',
      desc: 'Lectura/escritura, NIO.2 y serialización de objetos.',
      cert: 'Java SE I/O', offset: 37,
      lessons: ['Lectura / Escritura', 'NIO.2 & Paths', 'Serialización', 'Evaluación']
    },
    {
      badge: 'M8', title: 'Concurrencia',
      desc: 'Threads, sincronización, ExecutorService y CompletableFuture.',
      cert: 'Java SE Concurrency', offset: 40,
      lessons: ['Threads & Runnable', 'Sincronización', 'ExecutorService', 'CompletableFuture', 'Evaluación']
    },
    {
      badge: 'M9', title: 'Java 9–24',
      desc: 'Records, Sealed Classes, Pattern Matching, Virtual Threads y novedades.',
      cert: 'Java SE Modern', offset: 44,
      lessons: ['Records (Java 16)', 'Sealed Classes (Java 17)', 'Pattern Matching (Java 21)', 'Virtual Threads (Java 21)', 'Text Blocks & Templates', 'Novedades Java 22–24', 'Evaluación']
    }
  ];

  private readonly OOP_PILLARS: Record<string, string> = {
    'Abstracción':      '1. Abstracción',
    'Encapsulamiento': '2. Encapsulamiento',
    'Herencia':        '3. Herencia',
    'Polimorfismo':    '4. Polimorfismo',
  };

  override labelFor(mi: number, lesson: string): string {
    if (this.modules[mi]?.badge !== 'M2') return lesson;
    return this.OOP_PILLARS[lesson] ?? lesson;
  }

  protected override onLessonChange(): void {
    this.initCurrentEditor();
  }

  private initCurrentEditor() {
    if (typeof window === 'undefined') return;
    const gl = this.globalLesson;
    setTimeout(() => {
      if (gl >= 0) this.setupEditor('c' + gl, 'h' + gl, 'g' + gl, gl);
    });
  }


  DEFAULTS: string[] = [
 `public class Hola {\n  public static void main(String[] args) {\n    System.out.println("¡Hola, mundo!");\n    System.out.println("Java " + System.getProperty("java.version"));\n  }\n}`,
 `public class Version {\n  public static void main(String[] args) {\n    String ver = System.getProperty("java.version");\n    String vm  = System.getProperty("java.vm.name");\n    System.out.println("Versión : " + ver);\n    System.out.println("JVM     : " + vm);\n  }\n}`,
 `public class Variables {\n  public static void main(String[] args) {\n    int     edad    = 25;\n    double  salario = 2450.75;\n    boolean activo  = true;\n    char    inicial = 'J';\n    String  nombre  = "María";\n    final double PI = 3.14159;\n    System.out.println(nombre + " tiene " + edad + " años.");\n    System.out.println("Salario: " + salario);\n    System.out.println("Activo:  " + activo);\n    System.out.println("Inicial: " + inicial);\n    System.out.printf("PI = %.5f%n", PI);\n  }\n}`,
 `public class Operadores {\n  public static void main(String[] args) {\n    int a = 10, b = 3;\n    System.out.println("Suma:    " + (a + b));\n    System.out.println("Resta:   " + (a - b));\n    System.out.println("Módulo:  " + (a % b));\n    System.out.println("Div entera: " + (a / b));\n    System.out.println("Div real:   " + (a / (double) b));\n    int x = 5;\n    x += 3;\n    System.out.println("x += 3  " + x);\n    x++;\n    System.out.println("x++     " + x);\n    System.out.println("10 > 3 : " + (a > b));\n    System.out.println("10 == 3: " + (a == b));\n  }\n}`,
 `public class IfElse {\n  public static void main(String[] args) {\n    int nota = 75;\n    String resultado;\n    if (nota >= 90) {\n      resultado = "Sobresaliente";\n    } else if (nota >= 70) {\n      resultado = "Notable";\n    } else if (nota >= 50) {\n      resultado = "Aprobado";\n    } else {\n      resultado = "Suspenso";\n    }\n    System.out.println("Nota " + nota + " → " + resultado);\n    String tipo = (nota >= 50) ? "APROBADO" : "NO APROBADO";\n    System.out.println("Estado: " + tipo);\n  }\n}`,
 `public class SwitchDemo {\n  public static void main(String[] args) {\n    int nota = 85;\n    String resultado = switch (nota / 10) {\n      case 10, 9 -> "Excelente";\n      case 8 -> {\n        System.out.println("Buen trabajo, sigue así");\n        yield "Muy Bien";\n      }\n      case 7 -> "Aprobado";\n      case 6 -> {\n        System.out.println("Necesitas mejorar");\n        yield "Regular";\n      }\n      default -> "Reprobado";\n    };\n    System.out.println("Resultado: " + resultado);\n  }\n}`,
 `public class BuclesFor {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) {\n      System.out.println("Iteración: " + i);\n    }\n    int[] nums = {10, 20, 30, 40};\n    int suma = 0;\n    for (int n : nums) {\n      suma += n;\n    }\n    System.out.println("Suma: " + suma);\n  }\n}`,
 `public class Bucles {\n  public static void main(String[] args) {\n    int n = 1;\n    while (n <= 5) {\n      System.out.print(n + " ");\n      n++;\n    }\n    System.out.println();\n    int x = 10;\n    do {\n      System.out.print(x + " ");\n      x -= 3;\n    } while (x > 0);\n    System.out.println();\n  }\n}`,
 `public class BreakContinue {\n  public static void main(String[] args) {\n    for (int i = 0; i < 10; i++) {\n      if (i % 2 == 0) continue;\n      if (i == 7)     break;\n      System.out.print(i + " ");\n    }\n    System.out.println();\n  }\n}`,
  '',
 `public class ClasesObjetos {
  static class Coche {
    String marca;
    int    anio;
    void mostrar() {
      System.out.println(marca + " (" + anio + ")");
    }
  }

  public static void main(String[] args) {
    Coche c1 = new Coche();
    c1.marca = "Toyota";
    c1.anio  = 2022;
    c1.mostrar();
    Coche c2 = new Coche();
    c2.marca = "Honda";
    c2.anio  = 2024;
    c2.mostrar();
  }
}`,
 '',
 `public class Persona {
  String nombre;
  int edad;

  Persona(String nombre, int edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  void presentarse() {
    System.out.println("Hola, soy " + nombre + " y tengo " + edad + " años.");
  }

  public static void main(String[] args) {
    Persona a = new Persona("María", 30);
    Persona b = new Persona("Luis", 25);
    a.presentarse();
    b.presentarse();
  }
}`,
 `public class EstaticoDemo {\n  static class Persona {\n    static int contador = 0;\n    String nombre;\n    Persona(String n) { nombre = n; contador++; }\n    static int total() { return contador; }\n  }\n  static class Utilidades {\n    static void saludar(String n) {\n      System.out.println("Hola, " + n);\n    }\n  }\n  public static void main(String[] args) {\n    int personas = 0;\n    personas++;  // new Persona("Ana")\n    personas++;  // new Persona("Luis")\n    System.out.println("Personas: " + personas);\n    System.out.println("Hola, Carlos");\n  }\n}`,
 `class Auto {\n  public void encender() {\n    verificarMotor();\n    System.out.println("El auto est\u00e1 encendido");\n  }\n  private void verificarMotor() {\n    System.out.println("Verificando motor...");\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Auto miAuto = new Auto();\n    miAuto.encender();\n  }\n}`,
 `public class CuentaBancaria {\n  private double saldo;\n  CuentaBancaria(double s) { this.saldo = s; }\n  public double getSaldo() { return saldo; }\n  public void depositar(double m) { if (m > 0) saldo += m; }\n  public void retirar(double m) {\n    if (m > 0 && m <= saldo) saldo -= m;\n    else System.out.println("Fondos insuficientes.");\n  }\n  public static void main(String[] args) {\n    CuentaBancaria c = new CuentaBancaria(500.0);\n    c.depositar(200.0);\n    c.retirar(100.0);\n    System.out.printf("Saldo: %.2f%n", c.getSaldo());\n    c.retirar(1000.0);\n  }\n}`,
 `class Animal {\n    String nombre;\n\n    Animal(String n) {\n        this.nombre = n;\n    }\n\n    void sonido() {\n        System.out.println(nombre + " hace un sonido.");\n    }\n}\n\nclass Perro extends Animal {\n    Perro(String n) {\n        super(n);\n    }\n\n    @Override\n    void sonido() {\n        System.out.println(nombre + " dice: Guau!");\n    }\n}\n\nclass Gato extends Animal {\n    Gato(String n) {\n        super(n);\n    }\n\n    @Override\n    void sonido() {\n        System.out.println(nombre + " dice: Miau!");\n    }\n}\n\npublic class HerenciaDemo {\n    public static void main(String[] args) {\n        Animal[] a = {new Perro("Rex"), new Gato("Luna"), new Animal("Bestia")};\n        for (Animal x : a) x.sonido();\n    }\n}`,
 `abstract class Animal {\n  String nombre;\n  Animal(String n) { this.nombre = n; }\n  abstract void sonido();\n  void dormir() { System.out.println(nombre + " está durmiendo."); }\n}\nclass Perro extends Animal {\n  Perro(String n) { super(n); }\n  void sonido() { System.out.println(nombre + " dice: ¡Guau!"); }\n}\nclass Gato extends Animal {\n  Gato(String n) { super(n); }\n  void sonido() { System.out.println(nombre + " dice: ¡Miau!"); }\n}\npublic class AbstractaDemo {\n  public static void main(String[] args) {\n    Animal[] animales = { new Perro("Rex"), new Gato("Luna") };\n    for (Animal a : animales) {\n      a.sonido();\n      a.dormir();\n    }\n  }\n}`,
 `class Forma {\n  void mostrar() { System.out.println("Forma gen\u00e9rica"); }\n}\nclass Circulo extends Forma {\n  double r;\n  Circulo(double r) { this.r = r; }\n  void mostrar() { System.out.println("Circulo  area=" + (3.14159 * r * r)); }\n}\nclass Rectangulo extends Forma {\n  double w;\n  double h;\n  Rectangulo(double w, double h) {\n    this.w = w;\n    this.h = h;\n  }\n  void mostrar() { System.out.println("Rectangulo area=" + (w * h)); }\n}\npublic class PolimorfismoDemo {\n  public static void main(String[] args) {\n    Forma[] formas = { new Circulo(5), new Rectangulo(4, 7) };\n    for (Forma f : formas) {\n      f.mostrar();\n    }\n  }\n}`,
 `interface Volador {\n  void volar();\n}\ninterface Nadador {\n  void nadar();\n}\nclass Pato implements Volador, Nadador {\n  public void volar() { System.out.println("El pato vuela."); }\n  public void nadar() { System.out.println("El pato nada."); }\n  public void aterrizar() { System.out.println("El pato aterriza."); }\n}\nclass Aguila implements Volador {\n  public void volar() { System.out.println("El aguila vuela alto."); }\n}\npublic class InterfacesDemo {\n  public static void main(String[] args) {\n    Pato p = new Pato();\n    p.volar();\n    p.nadar();\n    p.aterrizar();\n    Aguila a = new Aguila();\n    a.volar();\n  }\n}`,
 `public class EnumDemo {\n  public static void main(String[] args) {\n    String estado = "EN_PROCESO";\n    if (estado.equals("PENDIENTE"))   System.out.println("Estado: Pendiente");\n    if (estado.equals("EN_PROCESO"))  System.out.println("Estado: En proceso");\n    if (estado.equals("ENVIADO"))     System.out.println("Estado: Enviado");\n    if (estado.equals("ENTREGADO"))   System.out.println("Estado: Entregado");\n    System.out.println("Procesando pedido: " + estado);\n  }\n}`,
 `import java.util.Arrays;\npublic class ArraysDemo {\n  public static void main(String[] args) {\n    int[] notas = {85, 72, 91, 60, 78};\n    Arrays.sort(notas);\n    System.out.println("Ordenado: " + Arrays.toString(notas));\n    int suma = 0;\n    for (int n : notas) suma += n;\n    System.out.printf("Media: %.1f%n", (double) suma / notas.length);\n    System.out.println("Max: " + notas[notas.length - 1]);\n    System.out.println("Min: " + notas[0]);\n  }\n}`,
 `public class MatrizDemo {\n  public static void main(String[] args) {\n    int[][] m = { {1,2,3}, {4,5,6}, {7,8,9} };\n    int diag = 0;\n    for (int i = 0; i < m.length; i++) {\n      for (int j = 0; j < m[i].length; j++)\n        System.out.printf("%3d", m[i][j]);\n      diag += m[i][i];\n      System.out.println();\n    }\n    System.out.println("Diagonal: " + diag);\n  }\n}`,
 `import java.util.List;\nimport java.util.Map;\npublic class IteracionDemo {\n  public static void main(String[] args) {\n    List<String> nombres = List.of("Ana", "Bob", "Carlos");\n    nombres.forEach(n -> System.out.println("→ " + n));\n    Map<String, Integer> pts = Map.of("Ana", 90, "Bob", 75, "Carlos", 88);\n    pts.entrySet().stream()\n       .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())\n       .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));\n  }\n}`,
 `import java.util.ArrayList;\nimport java.util.Collections;\npublic class ListasDemo {\n  public static void main(String[] args) {\n    ArrayList<String> frutas = new ArrayList<>();\n    frutas.add("Mango");\n    frutas.add("Pera");\n    frutas.add("Fresa");\n    frutas.add("Pera");\n    Collections.sort(frutas);\n    System.out.println("Ordenada: " + frutas);\n    frutas.remove("Pera");\n    System.out.println("Sin Pera: " + frutas);\n    System.out.println("Tamaño:   " + frutas.size());\n  }\n}`,
 `import java.util.HashMap;\nimport java.util.HashSet;\npublic class MapSetDemo {\n  public static void main(String[] args) {\n    HashMap<String, Integer> stock = new HashMap<>();\n    stock.put("Manzana", 30);\n    stock.put("Pera",    12);\n    stock.put("Uva",     55);\n    stock.put("Manzana", 40);\n    System.out.println("Stock: " + stock);\n    System.out.println("Manzana: " + stock.get("Manzana"));\n    HashSet<String> set = new HashSet<>();\n    set.add("rojo"); set.add("azul"); set.add("rojo");\n    System.out.println("Set: " + set);\n  }\n}`,
 `public class RecursividadDemo {\n  static long fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n  }\n  static int potencia(int base, int exp) {\n    if (exp == 0) return 1;\n    return base * potencia(base, exp - 1);\n  }\n  public static void main(String[] args) {\n    System.out.print("Fib: ");\n    for (int i = 0; i < 10; i++) System.out.print(fibonacci(i) + " ");\n    System.out.println();\n    System.out.println("2^10 = " + potencia(2, 10));\n  }\n}`,
 `public class SobrecargaDemo {\n  static double sumar(int a, int b)                  { return a + b; }\n  static double sumar(double a, double b)            { return a + b; }\n  static double sumar(double a, double b, double c)  { return a + b + c; }\n  public static void main(String[] args) {\n    System.out.println(sumar(3, 4));\n    System.out.println(sumar(1.5, 2.5));\n    System.out.println(sumar(1.0, 2.0, 3.0));\n  }\n}`,
 `public class ExcepcionesDemo {\n  static int dividir(int a, int b) { return a / b; }\n  public static void main(String[] args) {\n    try {\n      System.out.println(dividir(10, 2));\n      System.out.println(dividir(10, 0));\n    } catch (ArithmeticException e) {\n      System.out.println("Error: " + e.getMessage());\n    } finally {\n      System.out.println("Finally ejecutado.");\n    }\n    String s = null;\n    try {\n      System.out.println(s.length());\n    } catch (NullPointerException e) {\n      System.out.println("NullPointerException capturada.");\n    }\n  }\n}`,
 `public class JerarquiaDemo {\n  static void validar(int edad) {\n    if (edad < 0 || edad > 150)\n      throw new IllegalArgumentException("Edad inválida: " + edad);\n  }\n  public static void main(String[] args) {\n    try { validar(200); }\n    catch (IllegalArgumentException e) { System.out.println(e.getMessage()); }\n    try { Integer.parseInt("abc"); }\n    catch (NumberFormatException e) { System.out.println("Formato: " + e.getMessage()); }\n    try { int[] arr = new int[3]; arr[5] = 1; }\n    catch (ArrayIndexOutOfBoundsException e) { System.out.println("Índice: " + e.getMessage()); }\n  }\n}`,
 `public class CustomExcDemo {\n  static class SaldoInsuficienteException extends RuntimeException {\n    final double saldo, monto;\n    SaldoInsuficienteException(double s, double m) {\n      super(String.format("Saldo %.2f insuficiente para retirar %.2f", s, m));\n      this.saldo = s; this.monto = m;\n    }\n  }\n  static void retirar(double saldo, double monto) {\n    if (monto > saldo) throw new SaldoInsuficienteException(saldo, monto);\n    System.out.printf("Retirado %.2f, resto %.2f%n", monto, saldo - monto);\n  }\n  public static void main(String[] args) {\n    try {\n      retirar(100.0, 50.0);\n      retirar(100.0, 200.0);\n    } catch (SaldoInsuficienteException e) {\n      System.out.println("Excepción: " + e.getMessage());\n    }\n  }\n}`,
 `import java.io.*;\npublic class TryResourcesDemo {\n  public static void main(String[] args) {\n    String datos = "línea 1\\nlínea 2\\nlínea 3";\n    try (BufferedReader br = new BufferedReader(new StringReader(datos))) {\n      String linea;\n      while ((linea = br.readLine()) != null)\n        System.out.println(linea);\n    } catch (Exception e) {\n      System.out.println("Error: " + e.getMessage());\n    }\n    System.out.println("Reader cerrado automáticamente.");\n  }\n}`,
 `import java.util.ArrayList;\nimport java.util.List;\npublic class GenericsDemo {\n  static class Caja<T> {\n    private T contenido;\n    Caja(T c) { this.contenido = c; }\n    T abrir() { return contenido; }\n    public String toString() { return "Caja[" + contenido + "]"; }\n  }\n  static <T extends Comparable<T>> T maximo(List<T> lista) {\n    T max = lista.get(0);\n    for (T e : lista) if (e.compareTo(max) > 0) max = e;\n    return max;\n  }\n  public static void main(String[] args) {\n    Caja<String>  cs = new Caja<>("Hola");\n    Caja<Integer> ci = new Caja<>(42);\n    System.out.println(cs + " → " + cs.abrir());\n    System.out.println(ci + " → " + ci.abrir());\n    List<Integer> nums = new ArrayList<>(List.of(3,1,4,1,5,9,2,6));\n    System.out.println("Máximo: " + maximo(nums));\n  }\n}`,
 `import java.util.Arrays;\nimport java.util.List;\nimport java.util.function.Predicate;\npublic class LambdasDemo {\n  public static void main(String[] args) {\n    List<String> nombres = Arrays.asList("Ana","Bob","Carlos","Diana","Eve");\n    Predicate<String> masde3 = s -> s.length() > 3;\n    nombres.stream()\n           .filter(masde3)\n           .map(String::toUpperCase)\n           .sorted()\n           .forEach(System.out::println);\n  }\n}`,
 `import java.util.function.*;\npublic class FuncionalDemo {\n  public static void main(String[] args) {\n    Function<Integer, Integer> cuadrado = x -> x * x;\n    Function<Integer, Integer> masUno   = x -> x + 1;\n    Function<Integer, Integer> comp     = cuadrado.andThen(masUno);\n    System.out.println("cuadrado(5): " + cuadrado.apply(5));\n    System.out.println("comp(5):     " + comp.apply(5));\n    BiFunction<String, Integer, String> rep = (s, n) -> s.repeat(n);\n    System.out.println(rep.apply("Ha", 3));\n    Supplier<Double> random = Math::random;\n    System.out.printf("Random: %.4f%n", random.get());\n    Consumer<String> print = System.out::println;\n    print.accept("Consumer ejecutado");\n  }\n}`,
 `import java.util.List;\nimport java.util.stream.Collectors;\npublic class StreamsDemo {\n  public static void main(String[] args) {\n    List<Integer> nums = List.of(1,2,3,4,5,6,7,8,9,10);\n    int sumaParesAlCuadrado = nums.stream()\n      .filter(n -> n % 2 == 0)\n      .mapToInt(n -> n * n)\n      .sum();\n    System.out.println("Suma pares² = " + sumaParesAlCuadrado);\n    String impares = nums.stream()\n      .filter(n -> n % 2 != 0)\n      .map(Object::toString)\n      .collect(Collectors.joining(", "));\n    System.out.println("Impares: " + impares);\n    long count = nums.stream().filter(n -> n > 5).count();\n    System.out.println("Mayores que 5: " + count);\n  }\n}`,
 `import java.util.Optional;\nimport java.util.List;\npublic class OptionalDemo {\n  static Optional<String> buscar(List<String> lista, String p) {\n    return lista.stream().filter(s -> s.startsWith(p)).findFirst();\n  }\n  public static void main(String[] args) {\n    List<String> nombres = List.of("Ana","Bob","Carlos","Diana");\n    buscar(nombres, "Ca").ifPresentOrElse(\n      n -> System.out.println("Encontrado: " + n),\n      () -> System.out.println("No encontrado")\n    );\n    String x = buscar(nombres, "Z").orElse("Desconocido");\n    System.out.println("Con Z: " + x);\n    buscar(nombres, "An").map(String::toUpperCase).ifPresent(System.out::println);\n  }\n}`,
 `import java.io.*;\npublic class ArchivoDemo {\n  public static void main(String[] args) throws Exception {\n    StringWriter sw = new StringWriter();\n    try (BufferedWriter bw = new BufferedWriter(sw)) {\n      bw.write("Línea 1: Hola");\n      bw.newLine();\n      bw.write("Línea 2: Java");\n      bw.newLine();\n      bw.write("Línea 3: Mundo");\n    }\n    System.out.println("Escrito en buffer:");\n    try (BufferedReader br = new BufferedReader(new StringReader(sw.toString()))) {\n      br.lines().forEach(System.out::println);\n    }\n  }\n}`,
 `import java.nio.file.Path;\nimport java.nio.file.Paths;\npublic class NioDemo {\n  public static void main(String[] args) {\n    Path p1 = Paths.get("/home/user/docs/archivo.txt");\n    System.out.println("Archivo: " + p1.getFileName());\n    System.out.println("Padre:   " + p1.getParent());\n    System.out.println("Raíz:    " + p1.getRoot());\n    Path p2 = Paths.get("/home/user");\n    Path rel = p2.relativize(p1);\n    System.out.println("Relativo: " + rel);\n    Path p3 = Paths.get("/home/user/docs/../docs/./archivo.txt");\n    System.out.println("Normal:  " + p3.normalize());\n  }\n}`,
 `import java.io.*;\npublic class SerializacionDemo {\n  static class Producto implements Serializable {\n    private static final long serialVersionUID = 1L;\n    String nombre; double precio;\n    Producto(String n, double p) { nombre = n; precio = p; }\n    public String toString() { return nombre + " $" + precio; }\n  }\n  public static void main(String[] args) throws Exception {\n    Producto original = new Producto("Laptop", 999.99);\n    ByteArrayOutputStream baos = new ByteArrayOutputStream();\n    try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n      oos.writeObject(original);\n    }\n    try (ObjectInputStream ois = new ObjectInputStream(\n          new ByteArrayInputStream(baos.toByteArray()))) {\n      Producto copia = (Producto) ois.readObject();\n      System.out.println("Original: " + original);\n      System.out.println("Copia:    " + copia);\n      System.out.println("¿Mismo? " + (original == copia));\n    }\n  }\n}`,
 `public class ThreadsDemo {\n  static class Tarea implements Runnable {\n    String nombre; int veces;\n    Tarea(String n, int v) { nombre = n; veces = v; }\n    public void run() {\n      for (int i = 1; i <= veces; i++)\n        System.out.println(nombre + " - iter " + i);\n    }\n  }\n  public static void main(String[] args) throws Exception {\n    Thread t1 = new Thread(new Tarea("Hilo-A", 3));\n    Thread t2 = new Thread(new Tarea("Hilo-B", 3));\n    t1.start(); t2.start();\n    t1.join();  t2.join();\n    System.out.println("Ambos terminaron.");\n  }\n}`,
 `public class SincronizacionDemo {\n  static class Contador {\n    private int valor = 0;\n    synchronized void incrementar() { valor++; }\n    int getValor() { return valor; }\n  }\n  public static void main(String[] args) throws Exception {\n    Contador c = new Contador();\n    Thread[] hilos = new Thread[100];\n    for (int i = 0; i < 100; i++) {\n      hilos[i] = new Thread(c::incrementar);\n      hilos[i].start();\n    }\n    for (Thread h : hilos) h.join();\n    System.out.println("Contador (esperado 100): " + c.getValor());\n  }\n}`,
 `import java.util.concurrent.*;\npublic class ExecutorDemo {\n  public static void main(String[] args) throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(3);\n    Future<Integer> f1 = pool.submit(() -> { Thread.sleep(50); return 2 + 2; });\n    Future<Integer> f2 = pool.submit(() -> { Thread.sleep(50); return 2 * 5; });\n    Future<String>  f3 = pool.submit(() -> "Hola desde pool");\n    System.out.println("Tarea 1: " + f1.get());\n    System.out.println("Tarea 2: " + f2.get());\n    System.out.println("Tarea 3: " + f3.get());\n    pool.shutdown();\n  }\n}`,
 `import java.util.concurrent.CompletableFuture;\npublic class CompletableDemo {\n  public static void main(String[] args) throws Exception {\n    CompletableFuture<String> cf = CompletableFuture\n      .supplyAsync(() -> "dato async")\n      .thenApply(String::toUpperCase)\n      .thenApply(s -> "Procesado: " + s);\n    System.out.println(cf.get());\n    CompletableFuture<Integer> suma = CompletableFuture.supplyAsync(() -> 10)\n      .thenCombine(CompletableFuture.supplyAsync(() -> 20), Integer::sum);\n    System.out.println("Suma async: " + suma.get());\n  }\n}`,
 `public class RecordsDemo {\n  record Punto(double x, double y) {\n    double distancia() { return Math.sqrt(x * x + y * y); }\n  }\n  record Persona(String nombre, int edad) {\n    Persona {\n      if (edad < 0) throw new IllegalArgumentException("Edad negativa");\n    }\n  }\n  public static void main(String[] args) {\n    Punto p = new Punto(3.0, 4.0);\n    System.out.println("Punto:     " + p);\n    System.out.println("Distancia: " + p.distancia());\n    System.out.println("x =        " + p.x());\n    Persona ana = new Persona("Ana", 28);\n    System.out.println("Persona:   " + ana);\n    System.out.println("Iguales:   " + ana.equals(new Persona("Ana", 28)));\n  }\n}`,
 `public class SealedDemo {\n  sealed interface Figura permits Circulo, Rect, Tri {}\n  record Circulo(double r)         implements Figura {}\n  record Rect(double w, double h)  implements Figura {}\n  record Tri(double b, double alt) implements Figura {}\n  static double area(Figura f) {\n    return switch (f) {\n      case Circulo c -> Math.PI * c.r() * c.r();\n      case Rect r    -> r.w() * r.h();\n      case Tri t     -> 0.5 * t.b() * t.alt();\n    };\n  }\n  public static void main(String[] args) {\n    Figura[] fs = { new Circulo(5), new Rect(4,7), new Tri(6,3) };\n    for (Figura f : fs)\n      System.out.printf("%s area=%.2f%n", f.getClass().getSimpleName(), area(f));\n  }\n}`,
 `public class PatternMatchingDemo {\n  static String describir(Object obj) {\n    return switch (obj) {\n      case Integer i when i < 0 -> "Negativo: " + i;\n      case Integer i            -> "Positivo: " + i;\n      case String s when s.isEmpty() -> "Cadena vacía";\n      case String s             -> "Cadena: " + s;\n      case null                 -> "null";\n      default                   -> "Otro: " + obj;\n    };\n  }\n  public static void main(String[] args) {\n    System.out.println(describir(42));\n    System.out.println(describir(-5));\n    System.out.println(describir("Hola"));\n    System.out.println(describir(""));\n    System.out.println(describir(null));\n    System.out.println(describir(3.14));\n  }\n}`,
 `import java.util.concurrent.Executors;\npublic class VirtualThreadsDemo {\n  public static void main(String[] args) throws Exception {\n    long inicio = System.currentTimeMillis();\n    try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {\n      for (int i = 1; i <= 5; i++) {\n        int id = i;\n        exec.submit(() -> {\n          Thread.sleep(10);\n          System.out.println("VT-" + id + " virtual=" + Thread.currentThread().isVirtual());\n          return null;\n        });\n      }\n    }\n    System.out.println("Tiempo: " + (System.currentTimeMillis() - inicio) + "ms");\n  }\n}`,
 `public class TextBlocksDemo {\n  record Usuario(String nombre, int edad) {}\n  public static void main(String[] args) {\n    var u = new Usuario("Carlos", 30);\n    String clasico = "Hola " + u.nombre() + ", tienes " + u.edad() + " años.";\n    System.out.println(clasico);\n    String formatted = String.format("Hola %s, tienes %d años.", u.nombre(), u.edad());\n    System.out.println(formatted);\n    String interpolado = "Hola %s, tienes %d años.".formatted(u.nombre(), u.edad());\n    System.out.println(interpolado);\n    String bloque = """\n        Usuario : %s\n        Edad    : %d\n        Mayor   : %b\n        """.formatted(u.nombre(), u.edad(), u.edad() >= 18);\n    System.out.print(bloque);\n  }\n}`,
 `public class Java2224Demo {\n  public static void main(String[] args) {\n    System.out.println("=== Java 22 ===");\n    System.out.println("JEP 454 - Foreign Function & Memory API (GA)");\n    System.out.println("JEP 447 - Statements before super() [Preview]");\n    System.out.println("JEP 423 - Region Pinning for G1");\n    System.out.println("\\n=== Java 23 ===");\n    System.out.println("JEP 455 - Primitive types in Patterns [Preview]");\n    System.out.println("JEP 467 - Markdown Documentation Comments");\n    System.out.println("JEP 471 - Deprecación sun.misc.Unsafe");\n    System.out.println("\\n=== Java 24 ===");\n    System.out.println("JEP 484 - Class-File API (GA)");\n    System.out.println("JEP 491 - Sync Virtual Threads sin Pinning (GA)");\n    System.out.println("JEP 493 - Linking sin JMODs");\n    System.out.println("JEP 450 - Compact Object Headers [Experimental]");\n    System.out.println("\\nCiclo semestral: Mar y Sep de cada año.");\n  }\n}`
  ];

  highlight(code: string): string {
    return code.split('\n').map(l => this.highlightLine(l)).join('\n');
  }

  highlightLine(line: string): string {
    const tokens: Array<{text: string; cls: string | null}> = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] === '/' && line[i + 1] === '/') {
        tokens.push({ text: line.slice(i), cls: 'tc' });
        break;
      }
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && !(line[j] === '"' && line[j - 1] !== '\\')) j++;
        j++;
        tokens.push({ text: line.slice(i, j), cls: 'ts' });
        i = j;
        continue;
      }
      if (line[i] === "'" && line[i + 2] === "'") {
        tokens.push({ text: line.slice(i, i + 3), cls: 'ts' });
        i += 3;
        continue;
      }
      if (/[a-zA-Z_$]/.test(line[i])) {
        let j = i;
        while (j < line.length && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);
        let k = j;
        while (k < line.length && line[k] === ' ') k++;
        const isCall = line[k] === '(';
        const keywords = new Set(['public','private','protected','static','void','class','interface','extends','implements','new','return','if','else','for','while','do','switch','case','break','continue','final','abstract','import','package','try','catch','finally','throw','throws','true','false','null','this','super','record','sealed','permits','yield','var','instanceof','default','when']);
        const types = new Set(['int','double','float','long','boolean','char','byte','short','String','Object','Integer','Double','Float','Long','Boolean','Character','Byte','Short','System','Math','Arrays','List','Map','Set','ArrayList','HashMap','HashSet','LinkedList','Thread','Runnable','Optional','Future','CompletableFuture','ExecutorService','Executors','Scanner','Path','Paths','BufferedReader','BufferedWriter','StringReader','StringWriter','Serializable','ByteArrayOutputStream','ByteArrayInputStream','ObjectOutputStream','ObjectInputStream']);
        let cls: string | null = null;
        if (keywords.has(word)) cls = 'tk';
        else if (types.has(word)) cls = 'tt';
        else if (isCall) cls = 'tf';
        tokens.push({ text: word, cls });
        i = j;
        continue;
      }
      if (/\d/.test(line[i])) {
        let j = i;
        while (j < line.length && /[\d.fFLl]/.test(line[j])) j++;
        tokens.push({ text: line.slice(i, j), cls: 'tn' });
        i = j;
        continue;
      }
      if ('{}();,.'.includes(line[i])) {
        tokens.push({ text: line[i], cls: 'tp' });
        i++;
        continue;
      }
      const last = tokens[tokens.length - 1];
      if (last && last.cls === null) last.text += line[i];
      else tokens.push({ text: line[i], cls: null });
      i++;
    }
    return tokens.map(t => {
      const esc = t.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return t.cls ? `<span class="${t.cls}">${esc}</span>` : esc;
    }).join('');
  }

  updateGutter(gutterId: string, code: string) {
    const lines = code.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) html += `<span>${i}</span>`;
    const el = document.getElementById(gutterId);
    if (el) el.innerHTML = html;
  }

  syncEditor(codeId: string, highlightId: string, gutterId: string) {
    const ta = document.getElementById(codeId) as HTMLTextAreaElement;
    const hl = document.getElementById(highlightId);
    if (!ta) return;
    const val = ta.value;
    if (hl) hl.innerHTML = this.highlight(val) + '\n';
    this.updateGutter(gutterId, val);
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  setupEditor(codeId: string, highlightId: string, gutterId: string, defaultIdx: number) {
    const ta = document.getElementById(codeId) as HTMLTextAreaElement;
    if (!ta) return;
    const raw = this.DEFAULTS[defaultIdx] ?? '';
    ta.value = raw;
    const sync = () => this.syncEditor(codeId, highlightId, gutterId);
    ta.addEventListener('input', sync);
    ta.addEventListener('scroll', () => {
      const hl = document.getElementById(highlightId);
      if (hl) { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; }
    });
    ta.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = s + 2;
        sync();
      }
    });
    sync();
  }

  resetCode(codeId: string, highlightId: string, gutterId: string, idx: number) {
    const ta = document.getElementById(codeId) as HTMLTextAreaElement;
    if (!ta) return;
    const raw = this.DEFAULTS[idx] ?? '';
    ta.value = raw;
    this.syncEditor(codeId, highlightId, gutterId);
    const num = codeId.replace('c', '');
    const out = document.getElementById('o' + num);
    if (out) out.classList.remove('visible');
  }

  async runCode(codeId: string, outId: string, event: Event): Promise<void> {
    const id = Number(codeId.slice(1));
    const textarea = document.getElementById(codeId) as HTMLTextAreaElement | null;
    const button = event.currentTarget as HTMLButtonElement;
    if (!textarea) return;
    const file = textarea.closest('.playground')?.querySelector('.play-filename')?.textContent?.trim() || 'Main.java';
    const normalize = (s: string) => s.replace(/\r/g, '').trimEnd();
    const untouched = normalize(textarea.value) === normalize(this.DEFAULTS[id] ?? '') && PLAYGROUND_OUTPUTS[id] !== undefined;

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    const label = button.querySelector('.run-label');
    if (label) label.textContent = untouched ? 'Ejecutar' : 'Ejecutando…';
    if (!untouched) this.showOutput(outId, 'running', 'Compilando y ejecutando en OpenJDK 21…');

    const result: RunResult = untouched ? { kind: 'ok', output: PLAYGROUND_OUTPUTS[id] } : await runJava(file, textarea.value);

    button.disabled = false;
    button.removeAttribute('aria-busy');
    if (label) label.textContent = 'Ejecutar';
    this.showOutput(outId, result.kind, result.output || '(el programa no imprimió nada)');
  }

  private showOutput(outId: string, kind: RunResult['kind'] | 'running', text: string): void {
    const box = document.getElementById(outId);
    const out = document.getElementById(outId + 't');
    const dot = document.getElementById(outId + 'd');
    const lbl = document.getElementById(outId + 'l');
    const labels: Record<RunResult['kind'] | 'running', string> = {
      running: 'Ejecutando',
      ok: 'Salida del programa',
      'compile-error': 'Error de compilación',
      'runtime-error': 'Error en ejecución',
      busy: 'Servicio ocupado',
      offline: 'Sin respuesta',
    };
    const failed = kind !== 'ok' && kind !== 'running';
    box?.classList.add('visible');
    if (out) {
      out.className = 'out-text ' + (failed ? 'error' : 'ok');
      out.textContent = text;
    }
    if (dot) dot.className = 'out-dot' + (failed ? ' err' : kind === 'running' ? ' wait' : '');
    if (lbl) lbl.textContent = labels[kind];
  }

}
