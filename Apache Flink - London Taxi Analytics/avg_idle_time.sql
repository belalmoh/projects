-- calculating the Average of the idleTime per Area
SELECT AreaID,avg(idleTime) FROM (
	SELECT * FROM Rides
    MATCH_RECOGNIZE(
        PARTITION BY taxiId
        ORDER BY rideTime
        MEASURES
            toAreaId(END_RIDE.lon, END_RIDE.lat) AS AreaID,
            END_RIDE.rideTime AS ride_end,
            NEXT_RIDE.rideTime AS next_ride_start,
            MATCH_ROWTIME() as rowTime,
            -- getting the difference between End Ride and the next Start Ride
            TIMESTAMPDIFF(MINUTE, END_RIDE.rideTime, NEXT_RIDE.rideTime) AS idleTime
        AFTER MATCH SKIP PAST LAST ROW
        -- The pattern E S is used because the taxi is only waiting and idle during the time that's between the last ride and the next ride.
        -- So the pattern E S => getting all rides that has END then followed by START
        PATTERN (END_RIDE NEXT_RIDE) WITHIN INTERVAL '4' HOUR
        DEFINE
            END_RIDE AS END_RIDE.isStart = false,
            NEXT_RIDE AS NEXT_RIDE.isStart = true
        )
  )
GROUP BY AreaID,TUMBLE(rowTime,INTERVAL '1' HOUR);