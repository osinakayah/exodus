# Bitcoin OP_RETURN Reader

This project store and index Bitcoin OP_RETURN data and serves this over an JSON api.
The project makes use of bitcoind to sync with bitcoin transactions chain and a node.js child process is used to read this information and store it in a Postgres database

## Getting Started
```
$ git clone 
$ cd exodus
$ yarn
$ cp .env.example .env
```

After cloning the project, modify the .env file to your Postgress connection parameters.

A bitcoin.conf file can be found at the root of this repository, you can use that to replace the default configuration.
```
$ yarn dev
```

### Prerequisites

- Install Node.js (minimum version 10.16.3)
```
node -v
```
- Install Postgress (https://www.postgresql.org/download/)
- Install Git. (You can check github installation with this command  )
```'
git --version
```
- Install Yarn (https://yarnpkg.com/lang/en/docs/install/)

End with an example of getting some data out of the system or using it for a little demo

## Running the tests
```
yarn test
```


## Authors

* **Ifeanyi Osinakayah Joseph**

## License

This project is licensed under the MIT License

