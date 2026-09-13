create or replace view accommodation_short_view as
select
    a.id,
    a.name,
    a.category,
    a.num_rooms
from accommodations as a;

create or replace view accommodation_extended_view as
select
    a.id,
    a.name,
    a.category,
    a.num_rooms,
    h.name || ' ' || h.surname as host_full_name,
    c.name as host_country
from accommodations as a
join hosts as h on h.id = a.host_id
join countries as c on c.id = h.country_id;

