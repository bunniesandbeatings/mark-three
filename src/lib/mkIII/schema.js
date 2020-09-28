import { schema } from 'normalizr';

export const button = new schema.Entity(
    'buttons',
    {},
    {idAttribute: (button,parent) => `${parent.id}:${button.id}`}

)

export const template = new schema.Entity(
    'templates',
    {
        buttons: [button]
    }
);

export const templates = [template];