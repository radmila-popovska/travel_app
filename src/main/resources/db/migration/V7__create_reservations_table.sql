CREATE TABLE reservations (
                               id BIGSERIAL PRIMARY KEY,
                               created_at TIMESTAMP NOT NULL,
                               updated_at TIMESTAMP NOT NULL,
                               reserved_at TIMESTAMP NOT NULL,
                               release_at TIMESTAMP NOT NULL,
                               user_id BIGINT NOT NULL,
                               accommodation_id BIGINT NOT NULL,
                               CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(id),
                               CONSTRAINT fk_reservation_accommodation FOREIGN KEY (accommodation_id) REFERENCES accommodations(id),
                               CONSTRAINT uk_reservation_user UNIQUE (user_id),
                               CONSTRAINT uk_reservation_accommodation UNIQUE (accommodation_id)
);

