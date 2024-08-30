# Impact Scribe

## Cloud Functions

### Project setup

Navigate to `functions` folder and run

```
cd functions && yarn install
```

### Run functions locally

To test your cloud functions locally against development project run

```
yarn serve
```

### Deploy cloud functions

- Login to firebase cli

```
firebase login
```

- If you are already logged in, the firebase cli will return current account, if it is not the correct one, you need to log out first

```
firbase logout
```

- Run the corresponding script according to the environment you want to deploy

```
yarn deploy:functions:dev
yarn deploy:functions:prod
```

### Get/Set environment variables

Options: `dev, prod`

- Getting environment variables from the given environment.

```
./scripts/env-vars-get.sh <env option>

# Example:
./scripts/env-vars-get.sh dev
```

- Setting environment variables for an specific environment.

```
./scripts/env-vars-set.sh <env option>

# Example:
./scripts/env-vars-set.sh dev
```

### Unset environment variables

```
firebase functions:config:unset env.<env variable name>

# Example:
firebase functions:config:unset env.bucket
