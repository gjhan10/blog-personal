export type RunKind = 'ok' | 'compile-error' | 'runtime-error' | 'busy' | 'offline';

export interface RunResult {
  kind: RunKind;
  output: string;
}

const ENDPOINT = 'https://wandbox.org/api/compile.json';
const COMPILER = 'openjdk-jdk-21+35';
const TIMEOUT_MS = 30_000;

const toAsciiSource = (source: string) =>
  source.replace(/[^\x00-\x7f]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));

export async function runJava(file: string, source: string): Promise<RunResult> {
  const className = file.replace(/\.java$/, '');
  if (!/^[A-Za-z_]\w*$/.test(className)) {
    return { kind: 'compile-error', output: `El nombre de archivo ${file} no es válido.` };
  }
  if (!new RegExp(`\\bclass\\s+${className}\\b`).test(source)) {
    return { kind: 'compile-error', output: `El código debe declarar la clase ${className} con su método main, porque el archivo se llama ${file}.` };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        compiler: COMPILER,
        code: `public class prog { public static void main(String[] a) throws Throwable { ${className}.main(a); } }`,
        codes: [{ file, code: toAsciiSource(source) }],
        'runtime-option-raw': '-Dstdout.encoding=UTF-8\n-Dstderr.encoding=UTF-8',
      }),
    });
    const text = await response.text();
    if (response.status === 429 || /too many requests/i.test(text)) {
      return { kind: 'busy', output: 'Se hicieron varias ejecuciones seguidas. Espera unos segundos y vuelve a intentarlo.' };
    }
    if (!response.ok || !text.trim().startsWith('{')) {
      return { kind: 'offline', output: 'El compilador en línea no respondió. Inténtalo de nuevo en unos segundos.' };
    }
    const result = JSON.parse(text) as { status?: string | number; compiler_error?: string; program_output?: string; program_error?: string };
    const output = (result.program_output ?? '').replace(/\n+$/, '');
    if (String(result.status) === '0') return { kind: 'ok', output };
    if (result.compiler_error && !output && !result.program_error) {
      return { kind: 'compile-error', output: result.compiler_error.trim() };
    }
    return { kind: 'runtime-error', output: [output, (result.program_error ?? '').trim()].filter(Boolean).join('\n') };
  } catch {
    return { kind: 'offline', output: 'No se pudo contactar con el compilador en línea. Revisa tu conexión e inténtalo de nuevo.' };
  } finally {
    clearTimeout(timer);
  }
}
