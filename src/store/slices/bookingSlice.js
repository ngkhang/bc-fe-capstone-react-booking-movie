import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thongTinPhim: null,
  danhSachGhe: [],
  selectedSeats: [],
};

const bookingSeatSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.thongTinPhim = action.payload.thongTinPhim;
      state.danhSachGhe = action.payload.danhSachGhe;
      state.selectedSeats = [];
    },
    addSeat: (state, action) => {
      const { seat } = action.payload;
      const index = state.selectedSeats.findIndex(
        (s) => s.maGhe === seat.maGhe,
      );
      if (index !== -1) {
        state.selectedSeats.splice(index, 1);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    delAllSeat: (state) => {
      state.selectedSeats = [];
    },
    resetBooking: () => initialState,
  },
});

export const { setBookingData, addSeat, delAllSeat, resetBooking } =
  bookingSeatSlice.actions;

export const selectThongTinPhim = (state) => state.booking.thongTinPhim;
export const selectAllSeats = (state) => state.booking.danhSachGhe;
export const selectedSeats = (state) => state.booking.selectedSeats;
export const selectTotalPrice = (state) =>
  state.booking.selectedSeats.reduce((sum, seat) => sum + (seat.giaVe ?? 0), 0);

export const bookingReducer = bookingSeatSlice.reducer;
