var app = Vue.createApp({
  data() {
    return {
      couponCode: "",
      appliedCoupon: null,
      name: "",
      mobile: "",
      confirmed: false,
      selectedSeat: [],
      coupons: [
        {
          code: "100TAKAOFF",
          discount: 100,
        },
        {
          code: "200TAKAOFF",
          discount: 200,
        },
      ],
      seatStates: {
        sold: {
          text: "Sold",
          color: "red",
        },
        available: {
          text: "Available",
          color: "white",
        },
        booked: {
          text: "Booked",
          color: "gray",
        },
        selected: {
          text: "Selected",
          color: "green",
        },
      },
      seats: [
        {
          name: "A1",
          type: "available",
          price: 500,
        },
        {
          name: "A2",
          type: "available",
          price: 500,
        },
        {
          name: "A3",
          type: "available",
          price: 500,
        },
        {
          name: "A4",
          type: "available",
          price: 500,
        },
        {
          name: "B1",
          type: "available",
          price: 450,
        },
        {
          name: "B2",
          type: "available",
          price: 450,
        },
        {
          name: "B3",
          type: "available",
          price: 450,
        },
        {
          name: "B4",
          type: "available",
          price: 450,
        },
        {
          name: "C1",
          type: "sold",
          price: 500,
        },
        {
          name: "C2",
          type: "sold",
          price: 500,
        },
        {
          name: "C3",
          type: "sold",
          price: 500,
        },
        {
          name: "C4",
          type: "sold",
          price: 500,
        },
        {
          name: "D1",
          type: "available",
          price: 400,
        },
        {
          name: "D2",
          type: "available",
          price: 400,
        },
        {
          name: "D3",
          type: "available",
          price: 400,
        },
        {
          name: "D4",
          type: "available",
          price: 400,
        },
        {
          name: "E1",
          type: "available",
          price: 300,
        },
        {
          name: "E2",
          type: "available",
          price: 300,
        },
        {
          name: "E3",
          type: "booked",
          price: 300,
        },
        {
          name: "E4",
          type: "booked",
          price: 300,
        },
        {
          name: "F1",
          type: "available",
          price: 300,
        },
        {
          name: "F2",
          type: "available",
          price: 300,
        },
        {
          name: "F3",
          type: "available",
          price: 300,
        },
        {
          name: "F4",
          type: "available",
          price: 300,
        },
      ],
    };
  },

  computed: {
    selected() {
      let sc = this.seats.filter((item) => item.type === "selected");
      return sc;
    },

    totalPrice() {
      let tc = 0;
      this.selected.forEach((seat) => {
        tc += seat.price;
      });

      if (this.appliedCoupon) {
        tc -= this.appliedCoupon;
      }
      return tc;
    },
  },

  methods: {
    selectedSeats(seat) {
      let checkSeat = this.seats.find((s) => s.name === seat.name);

      if (checkSeat.type === "sold") {
        alert("You can not select this seat. This seat is already sold.");
        return;
      }

      if (checkSeat.type === "booked") {
        alert("You can not select this seat. This seat is already booked.");
        return;
      }

      if (checkSeat.type == "available" && this.selectedSeat.length > 2) {
        alert("You can not select more than 3 seats");
        return;
      }

      if (checkSeat.type === "selected") {
        checkSeat.type =
          checkSeat.type === "selected" ? "available" : "selected";
        this.selectedSeat.pop(checkSeat);
        return;
      }
      checkSeat.type = checkSeat.type === "selected" ? "available" : "selected";

      this.selectedSeat.push(checkSeat);
    },

    confirmBooking() {
      if (!this.name || !this.mobile) {
        alert("Please provide your name and mobile number");
        return;
      }

      this.confirmed = true;
    },
    resetData() {
      this.confirmed = false;
      this.name = "";
      this.mobile = "";
      this.couponCode = "";
      this.selectedSeat = [];

      this.seats.forEach((seat) => {
        if (seat.type === "selected") {
          seat.type = "sold";
        }
      });
    },
  },

  watch: {
    couponCode(newValue) {
      if (newValue.length === 10) {
        let foundCoupon = this.coupons.find((c) => c.code === newValue);

        if (foundCoupon) {
          this.appliedCoupon = foundCoupon.discount;
        }
      }
    },
  },
});

app.mount("#app");
