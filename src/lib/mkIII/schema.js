import { schema } from 'normalizr';

export const button = new schema.Entity(
    'buttons',
    {},
    {idAttribute: (button,parent) => `${parent.id}:${button.id}`}

)

export const knob = new schema.Entity(
    'knobs',
    {},
    {idAttribute: (knob,parent) => `${parent.id}:${knob.id}`}

)

export const template = new schema.Entity(
    'templates',
    {
        buttons: [button],
        knobs: [knob],
    }
);

export const templates = [template];