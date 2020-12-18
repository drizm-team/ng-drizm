export interface LoaderConfig {

  /**
   * Whether to show the loader during Router navigation
   */
  navigationLoader?: boolean;

  /**
   * Whether to show the loader for pending XHR requests
   */
  xhrLoader?: boolean;

  /**
   * How long should the service wait before showing the loader (in ms)
   */
  wait?: number;
}
