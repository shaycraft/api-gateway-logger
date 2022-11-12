create table if not exists requests
(
    id        serial
        primary key,
    timestamp timestamp,
    headers   text,
    source varchar(255)
);

alter table requests
    owner to shaycraft;

