package booking

import (
	"context"
	"slices"
	"time"

	"encore.app/booking/db"
	"github.com/jackc/pgx/v5/pgtype"
)

func listBookingsBetween(
	ctx context.Context,
	start, end time.Time,
) ([]*Booking, error) {
	rows, err := query.ListBookingsBetween(ctx, db.ListBookingsBetweenParams{
		StartTime: pgtype.Timestamp{Time: start, Valid: true},
		EndTime:   pgtype.Timestamp{Time: end, Valid: true},
	})
	if err != nil {
		return nil, err
	}
	var bookings []*Booking
	for _, row := range rows {
		bookings = append(bookings, &Booking{
			ID:    row.ID,
			Start: row.StartTime.Time,
			End:   row.EndTime.Time,
			Email: row.Email,
		})
	}
	return bookings, nil
}

func filterBookableSlots(
	slots []BookableSlot,
	now time.Time,
	bookings []*Booking,
) []BookableSlot {
	// Remove slots for which the start time has already passed.
	slots = slices.DeleteFunc(slots, func(s BookableSlot) bool {
		// Has the slot already passed?
		if s.Start.Before(now) {
			return true
		}

		// Is there a booking that overlaps with this slot?
		for _, b := range bookings {
			if b.Start.Before(s.End) && b.End.After(s.Start) {
				return true
			}
		}

		return false
	})
	return slots
}
