create table accommodation_activity_logs (
    id bigserial primary key,
    accommodation_name varchar(255) not null,
    event_timestamp timestamp not null,
    event_type varchar(64) not null
);

