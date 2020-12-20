export default {
  data() {
    return {
      now: {
        year: 0,
        month: 0,
        date: 0,
      },
    };
  },
  mounted() {
    const dateObj = new Date();
    this.now = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth(),
      date: dateObj.getDate(),
    };
  },
};
