type Encodable = string | object | bigint | number | boolean | symbol;

export function toBase64(content: Encodable): string {
  switch (typeof content) {
    case 'string':
      return btoa(content);
    case 'object':
      return btoa(JSON.stringify(content));
    case 'bigint':
    case 'number':
    case 'boolean':
    case 'symbol':
      return btoa(content.toString());
    default:
      throw new Error('Drizm#toBase64: Data type not supported for encoding');
  }
}

export function fromBase64(value: string): string {
  if (!value) {
    throw new Error('Drizm#fromBase64: The value to be decoded does not exist');
  }
  return atob(value);
}
