create materialized view accommodation_category_stats_mv as
select
    a.category,
    count(*) as total_accommodations,
    sum(a.num_rooms) as total_rooms,
    avg(a.num_rooms)::numeric(10, 2) as average_rooms
from accommodations as a
group by a.category;

