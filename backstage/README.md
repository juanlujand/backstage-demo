# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn dev
```

KCD DEMO

Requisitos:

- Cuenta en Quay.io
- Cuenta Github


Para efectos de la demo se utilizara un repositorio abierto en Quay y Github. En caso de querer usar repositorios privados, seguir la documentacion oficial de cada plugin.

# Set variables de entorno

export GITHUB_TOKEN=<TOKEN_PERSONAL>
export GITHUB_CLIENT_ID=<GH_OAUTH_CLIENT>
export GITHUB_CLIENT_SECRET=<GH_OAUTH_SECRET>
# Opcional en caso de usar node 20
export NODE_OPTIONS=--no-node-snapshot


# Fuente de datos para los quickaccess y la data de los techradars

En el archivo app-config modificar los path a los archivos json

```yaml
proxy:
  endpoints:
    '/quay/api':
      target: 'https://quay.io'
      headers:
        X-Requested-With: 'XMLHttpRequest'
      changeOrigin: true
      secure: true
    '/quickaccess':
      target: https://raw.githubusercontent.com
      changeOrigin: true
      credentials: dangerously-allow-unauthenticated
      pathRewrite:
        '^/api/proxy/quickaccess': '/fmenesesg/kcd-lima-demo-data/main/quickaccessdata.json'
    '/techradars':
      target: https://raw.githubusercontent.com
      secure: true
      allowedMethods: ['GET']
      credentials: dangerously-allow-unauthenticated
      pathRewrite:
        '^/api/proxy/techradars/data-development.json': '/fmenesesg/kcd-lima-demo-data/main/data-development.json'
        '^/api/proxy/techradars/data-paas.json': '/fmenesesg/kcd-lima-demo-data/main/data-paas.json'
```
