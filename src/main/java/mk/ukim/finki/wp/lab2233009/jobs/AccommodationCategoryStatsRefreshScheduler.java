package mk.ukim.finki.wp.lab2233009.jobs;

import lombok.extern.slf4j.Slf4j;
import mk.ukim.finki.wp.lab2233009.repository.AccommodationCategoryStatsViewRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
public class AccommodationCategoryStatsRefreshScheduler {

    private final AccommodationCategoryStatsViewRepository accommodationCategoryStatsViewRepository;

    public AccommodationCategoryStatsRefreshScheduler(
            AccommodationCategoryStatsViewRepository accommodationCategoryStatsViewRepository
    ) {
        this.accommodationCategoryStatsViewRepository = accommodationCategoryStatsViewRepository;
    }

    @Scheduled(fixedDelayString = "${app.stats.mv.refresh-ms:60000}")
    @Transactional
    public void refreshAccommodationCategoryStatsMaterializedView() {
        log.info("Refreshing accommodation_category_stats_mv...");
        accommodationCategoryStatsViewRepository.refreshMaterializedView();
        log.info("accommodation_category_stats_mv refreshed.");
    }
}

