import { BaseClient } from './structures/BaseClient';
new BaseClient().connect();

process.on('unhandledRejection', data => {
    console.log(data);
});