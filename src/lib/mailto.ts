/** Link mailto com assunto e corpo passados por encodeURIComponent. */
export function buildMailtoHref(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
