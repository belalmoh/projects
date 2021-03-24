-- calculating profit per area query
SELECT profit_per_area.avgFareTip/emptyTaxis.taxisCount as profitability, emptyTaxis.Start_areaID as AreaID, emptyTaxis.rideTime
-- getting empty taxis
FROM (SELECT COUNT(taxiId) as taxisCount, Start_areaID, TUMBLE_END(rowTime, INTERVAL '15' minute) AS rideTime
FROM Rides
MATCH_RECOGNIZE (
    PARTITION BY taxiId
    ORDER BY rideTime
    MEASURES
        toAreaId(S.lon, S.lat) AS Start_areaID,
        MATCH_ROWTIME() as rowTime,
        S.rideId as rideId,
        S.rideTime as nextRideTime,
        E.rideTime as prevRideTime
    AFTER MATCH SKIP PAST LAST ROW
    -- Using the pattern E S => because the taxi is empty between the End previous ride and the next ride
    PATTERN (E S)
    DEFINE
        E AS E.isStart = false,
        -- Making sure that it's not the same ride ID and calculating the idle time that should be in range of 30 minutes
        S AS S.isStart = true AND E.rideId<>S.rideId AND TIMESTAMPDIFF(MINUTE, E.rideTime, S.rideTime) < 30
)
GROUP BY 
    Start_areaID, TUMBLE(rowTime,INTERVAL '15' MINUTE)) emptyTaxis
JOIN
-- getting area profit
(SELECT
    AVG(fare+tip) AS avgFareTip,
    r.Start_areaID,
    TUMBLE_END(r.rowTime, INTERVAL '15' minute) AS rideTime
FROM 
    Fares f,
(
    SELECT * FROM Rides
    MATCH_RECOGNIZE(
    PARTITION BY taxiId
    ORDER BY rideTime
    MEASURES
        toAreaId(S.lon, S.lat) AS Start_areaID,
        MATCH_ROWTIME() as rowTime,
        S.rideId as rideId
    AFTER MATCH SKIP PAST LAST ROW
    PATTERN (S E)
    DEFINE
        S AS S.isStart = true,
        -- making sure that each Start and End are of the same ride
        E AS E.isStart = false AND E.rideId=S.rideId
    )
) r
WHERE
    f.rideId = r.rideId AND
    -- getting the payment of the ride within the first 10 minutes of the ride itself
    f.payTime BETWEEN r.rowTime - INTERVAL '10' MINUTE AND r.rowTime
GROUP BY
    -- getting result of tumbling window of interval 15 minutes between each window
    r.Start_areaID, TUMBLE(r.rowTime,INTERVAL '15' MINUTE)) profit_per_area
ON
    -- join to match each area and each ride time
    profit_per_area.Start_areaID = emptyTaxis.Start_areaID AND profit_per_area.rideTime = emptyTaxis.rideTime
