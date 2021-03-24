-- selecting the top 10 routes and its rides count
SELECT Start_areaID,End_areaID,NO_Trips FROM(
    SELECT endTime,Start_areaID,End_areaID,NO_Trips, ROW_NUMBER() OVER (PARTITION BY endTime ORDER BY NO_Trips DESC) AS rownum FROM (
        -- counting the rides per area with tumble of window size 30 minutes
        SELECT TUMBLE_END(rowTime, INTERVAL '30' minute) AS endTime,Start_areaID,End_areaID,COUNT(DISTINCT Ride_ID) AS NO_Trips FROM (
          -- Getting the start area and end area of each trip to be fed for the upper query
          SELECT * FROM Rides
              MATCH_RECOGNIZE(
                  PARTITION BY taxiId
                  ORDER BY rideTime
                  MEASURES
                      toAreaId(Start_RIDE.lon, Start_RIDE.lat) AS Start_areaID,
                      toAreaId(END_RIDE.lon, END_RIDE.lat) AS End_areaID,
                      Start_RIDE.rideId AS Ride_ID,
                      MATCH_ROWTIME() as rowTime
                  AFTER MATCH SKIP PAST LAST ROW
                  PATTERN (Start_RIDE END_RIDE) WITHIN INTERVAL '30' MINUTE
                  DEFINE
                      Start_RIDE AS Start_RIDE.isStart = true,
                      END_RIDE AS END_RIDE.isStart = false AND END_RIDE.rideId=Start_RIDE.rideId
              )
        )
        GROUP BY Start_areaID,End_areaID,TUMBLE(rowTime,INTERVAL '30' MINUTE)
    )
)
WHERE rownum <=10;
