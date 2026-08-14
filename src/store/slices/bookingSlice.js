import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [],
};

const bookingSeatSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addSeat: (state, { payload }) => {
      const { seat } = payload;
      let seatExisting = state.seats.find((item) => item.soGhe === seat.soGhe);

      if (!seatExisting) state.seats = [...state.seats, seat];
      else
        state.seats = state.seats.filter(
          (item) => item.soGhe !== seatExisting.soGhe,
        );
    },
    delAllSeat: (state) => {
      state.seats = [];
    },
  },
});

export const { addSeat, delAllSeat } = bookingSeatSlice.actions;
export const selectedSeats = (state) => state.booking.seats;

export const bookingReducer = bookingSeatSlice.reducer;
