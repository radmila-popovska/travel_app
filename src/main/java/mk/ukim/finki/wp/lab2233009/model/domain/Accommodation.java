package mk.ukim.finki.wp.lab2233009.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Category;
import mk.ukim.finki.wp.lab2233009.model.domain.enums.Condition;

@Entity
@NamedEntityGraph(
        name = "accommodation-host-country-graph",
        attributeNodes = {
                @NamedAttributeNode(value = "host", subgraph = "host-country-subgraph")
        },
        subgraphs = {
                @NamedSubgraph(
                        name = "host-country-subgraph",
                        attributeNodes = {
                                @NamedAttributeNode("country")
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@Table(name = "accommodations")
public class Accommodation extends BaseAuditableEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer numRooms;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    private Host host;

    @Column(nullable = false)
    private Boolean rented;

    public Accommodation(String name, Category category, Host host, Condition condition, Integer numRooms, Boolean rented) {
        this.name = name;
        this.rented = rented;
        this.numRooms = numRooms;
        this.category = category;
        this.condition = condition;
        this.host = host;
    }
}
