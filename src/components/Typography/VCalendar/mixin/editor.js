export default {
  props: {
    width: {
      type: Number,
    },
  },
  data() {
    return {
      isPanelShow: false,
    };
  },
  watch: {
    isPanelShow(newVal) {
      if (newVal) {
        document.addEventListener('click', this.onDocumentClickHandler);
      } else {
        document.removeEventListener('click', this.onDocumentClickHandler);
      }
    },
  },
  computed: {
    style() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  methods: {
    togglePanel() {
      this.isPanelShow = !this.isPanelShow;
    },
    onDocumentClickHandler(e) {
      if (
        this.$refs.VCalendar__panel.$el.contains(e.target)
        || this.$refs.VCalendar.contains(e.target)
      ) return;
      this.isPanelShow = false;
    },
  },
};
