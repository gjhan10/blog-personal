import { runJava } from './java-runner';

describe('runJava', () => {
  const reply = (body: string, status = 200) => Promise.resolve(new Response(body, { status }));

  it('devuelve la salida del programa cuando compila y termina bien', async () => {
    const spy = spyOn(window, 'fetch').and.returnValue(reply(JSON.stringify({ status: '0', program_output: 'Hola\n' })));
    const result = await runJava('Hola.java', 'public class Hola { public static void main(String[] a) { System.out.println("Hola"); } }');
    expect(result).toEqual({ kind: 'ok', output: 'Hola' });
    const body = JSON.parse(spy.calls.mostRecent().args[1]!.body as string);
    expect(body.codes[0].file).toBe('Hola.java');
    expect(body.code).toContain('Hola.main(a)');
  });

  it('envía los caracteres no ASCII como escapes Unicode de Java', async () => {
    const spy = spyOn(window, 'fetch').and.returnValue(reply(JSON.stringify({ status: '0', program_output: 'año' })));
    await runJava('A.java', 'public class A { String s = "año"; }');
    const body = JSON.parse(spy.calls.mostRecent().args[1]!.body as string);
    expect(body.codes[0].code).toContain('a\\u00f1o');
  });

  it('distingue error de compilación, excepción, servicio saturado y falta de conexión', async () => {
    const src = 'public class A { public static void main(String[] a) {} }';
    const responses: (() => Promise<Response>)[] = [
      () => reply(JSON.stringify({ status: '1', compiler_error: 'A.java:1: error: x' })),
      () => reply(JSON.stringify({ status: '1', program_error: 'Exception in thread "main"' })),
      () => reply('Error: Too many requests', 429),
      () => Promise.reject(new TypeError('Failed to fetch')),
    ];
    let call = 0;
    spyOn(window, 'fetch').and.callFake(() => responses[call++]());
    expect((await runJava('A.java', src)).kind).toBe('compile-error');
    expect((await runJava('A.java', src)).kind).toBe('runtime-error');
    expect((await runJava('A.java', src)).kind).toBe('busy');
    expect((await runJava('A.java', src)).kind).toBe('offline');
  });

  it('avisa sin llamar a la red si la clase no coincide con el archivo', async () => {
    const spy = spyOn(window, 'fetch');
    const result = await runJava('Variables.java', 'public class Otra {}');
    expect(result.kind).toBe('compile-error');
    expect(spy).not.toHaveBeenCalled();
  });
});
