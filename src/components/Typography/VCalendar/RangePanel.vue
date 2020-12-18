<template>
  <div class="VCalendar__panel">
    <div class="VCalendar__panel__container previous">
      <div class="VCalendar__panel__container__top__control">
        <div class="VCalendar__panel__container__top__control__left">
          <button @click="setCurrentDateAndMonthListByYear(-1)">&#8249;</button>
          <button @click="setCurrentDateAndMonthListByMonth(-1)">&#171;</button>
        </div>
        <div class="VCalendar__panel__container__top__control__center">
          {{ topPreviousControlText }}
        </div>
      </div>
      <div class="VCalendar__panel__container__week">
        <div v-for="(week, index) in weeks" :key="index">
          {{ week.text }}
        </div>
      </div>
      <div class="VCalendar__panel__container__date__wrapper">
        <div
          v-for="(item, index) in calcPreviousMonthList"
          :key="index"
          :class="{
            disabled: item.disabled,
            active: item.active,
            isToday: item.isToday,
            inrange: item.isInRange,
            equalFirst: item.equalFirst,
            equalLast: item.equalLast,
          }"
          @click="onDatePick(item, $event)"
          @mouseover="onDateHover(item)"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
    <div class="VCalendar__panel__container present">
      <div class="VCalendar__panel__container__top__control">
        <div class="VCalendar__panel__container__top__control__center">
          {{ topPresentControlText }}
        </div>
        <div class="VCalendar__panel__container__top__control__right">
          <button @click="setCurrentDateAndMonthListByMonth(1)">&#187;</button>
          <button @click="setCurrentDateAndMonthListByYear(1)">&#8250;</button>
        </div>
      </div>
      <div class="VCalendar__panel__container__week">
        <div v-for="(week, index) in weeks" :key="index">
          {{ week.text }}
        </div>
      </div>
      <div class="VCalendar__panel__container__date__wrapper">
        <div
          v-for="(item, index) in calcPresentMonthList"
          :key="index"
          :class="{
            disabled: item.disabled,
            active: item.active,
            isToday: item.isToday,
            inrange: item.isInRange,
            equalFirst: item.equalFirst,
            equalLast: item.equalLast,
          }"
          @click="onDatePick(item, $event)"
          @mouseover="onDateHover(item)"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelMixin from './mixin/panel';
import weeks from './lib/enum';
import {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
} from './lib/utility';

export default {
  name: 'RangePanel',
  props: {
    defaultStartVal: {
      type: Object,
      default: () => ({ year: 0, month: 0, date: 0 }),
    },
    defaultEndVal: {
      type: Object,
      default: () => ({ year: 0, month: 0, date: 0 }),
    },
  },
  mixins: [panelMixin],
  data() {
    return {
      weeks,
      previousMonthDateList: [],
      presentMonthDateList: [],
      previous: {
        currentYear: 0,
        currentMonth: 0,
        currentDate: 0,
      },
      present: {
        currentYear: 0,
        currentMonth: 0,
        currentDate: 0,
      },
      startPickDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      endPickDate: {
        year: 0,
        month: 0,
        date: 0,
      },
      compare: {
        year: 0,
        month: 0,
        date: 0,
      },
      isStartPickRange: false,
      isDateRevert: true,
    };
  },
  mounted() {
    let isDefaulPropValid = false;
    if (validDate(this.defaultStartVal) && validDate(this.defaultEndVal)) {
      this.startPickDate = { ...this.defaultStartVal };
      this.endPickDate = { ...this.defaultEndVal };
      isDefaulPropValid = true;
    }
    const baseStartDate = isDefaulPropValid ? this.startPickDate : this.now;
    this.setCurrnetDate(
      'previous',
      baseStartDate.year,
      baseStartDate.month,
      baseStartDate.date
    );
    this.setCurrentMonthList(
      'previous',
      baseStartDate.year,
      baseStartDate.month
    );
    const nextMonthDateObj = getNewDateByMonth(
      baseStartDate.year,
      baseStartDate.month,
      baseStartDate.date,
      1
    );
    this.setCurrnetDate(
      'present',
      nextMonthDateObj.year,
      nextMonthDateObj.month,
      nextMonthDateObj.date
    );
    this.setCurrentMonthList(
      'present',
      nextMonthDateObj.year,
      nextMonthDateObj.month
    );
  },
  computed: {
    topPreviousControlText() {
      return (
        `${this.previous.currentYear
        }年${
          this.previous.currentMonth * 1 + 1
        }月`
      );
    },
    topPresentControlText() {
      return (
        `${this.present.currentYear
        }年${
          this.present.currentMonth * 1 + 1
        }月`
      );
    },
    calcPreviousMonthList() {
      return this.formatMonthListHelper(
        this.previousMonthDateList,
        this.previous.currentMonth
      ).map((item) => {
        const equalFirst = stringifyDate(this.startPickDate) === stringifyDate(item);
        const equalLast = stringifyDate(this.endPickDate) === stringifyDate(item);
        const active = equalFirst || equalLast;
        return {
          ...item,
          active,
          equalFirst,
          equalLast,
          isInRange:
            !item.disabled
            && !active
            && !getIsDateBeHindCompareDate(this.startPickDate, item)
            && getIsDateBeHindCompareDate(this.endPickDate, item),
        };
      });
    },
    calcPresentMonthList() {
      return this.formatMonthListHelper(
        this.presentMonthDateList,
        this.present.currentMonth
      ).map((item) => {
        const equalFirst = stringifyDate(this.startPickDate) === stringifyDate(item);
        const equalLast = stringifyDate(this.endPickDate) === stringifyDate(item);
        const active = equalFirst || equalLast;
        return {
          ...item,
          active,
          equalFirst,
          equalLast,
          isInRange:
            !item.disabled
            && !active
            && !getIsDateBeHindCompareDate(this.startPickDate, item)
            && getIsDateBeHindCompareDate(this.endPickDate, item),
        };
      });
    },
  },
  methods: {
    formatMonthListHelper(ary, currentMonth) {
      return ary.map((item) => ({
        ...item,
        disabled: item.month !== currentMonth,
        isToday: stringifyDate(item) === stringifyDate(this.now),
      }));
    },
    setCurrnetDate(type, year, month, date) {
      const obj = {
        currentYear: year,
        currentMonth: month,
        currentDate: date,
      };
      if (type === 'previous') {
        this.previous = { ...obj };
      } else {
        this.present = { ...obj };
      }
    },
    setCurrentMonthList(type, year, month) {
      if (type === 'previous') {
        this.previousMonthDateList = getMonthList(year, month);
      } else {
        this.presentMonthDateList = getMonthList(year, month);
      }
    },
    setCurrentDateAndMonthListByMonth(add) {
      const {
        year: previousY,
        month: previousM,
        date: previousD,
      } = getNewDateByMonth(
        this.previous.currentYear,
        this.previous.currentMonth,
        this.previous.currentDate,
        add
      );
      const {
        year: presentY,
        month: presentM,
        date: presentD,
      } = getNewDateByMonth(previousY, previousM, previousD, 1);
      this.setCurrnetDate('previous', previousY, previousM, previousD);
      this.setCurrnetDate('present', presentY, presentM, presentD);
      this.setCurrentMonthList('previous', previousY, previousM);
      this.setCurrentMonthList('present', presentY, presentM);
    },
    setCurrentDateAndMonthListByYear(add) {
      const {
        year: previousY,
        month: previousM,
        date: previousD,
      } = getNewDateByYear(
        this.previous.currentYear,
        this.previous.currentMonth,
        this.previous.currentDate,
        add
      );
      const {
        year: presentY,
        month: presentM,
        date: presentD,
      } = getNewDateByMonth(previousY, previousM, previousD, 1);
      this.setCurrnetDate('previous', previousY, previousM, previousD);
      this.setCurrnetDate('present', presentY, presentM, presentD);
      this.setCurrentMonthList('previous', previousY, previousM);
      this.setCurrentMonthList('present', presentY, presentM);
    },
    onDatePick({ year, month, date }, e) {
      e.target.classList.add('active');
      if (!this.isStartPickRange) {
        this.isStartPickRange = true;
        this.endPickDate = { year: 0, month: 0, date: 0 };
        this.startPickDate = { year: 0, month: 0, date: 0 };
        this.compare = { year, month, date };
      } else {
        this.$emit('onDatePick', {
          start: this.startPickDate,
          end: this.endPickDate,
        });
      }
    },
    onDateHover({
      year, month, date, disabled,
    }) {
      if (!this.isStartPickRange || disabled) return;
      this.isDateRevert = getIsDateBeHindCompareDate(this.compare, {
        year,
        month,
        date,
      });
      if (this.isDateRevert) {
        this.endPickDate = this.compare;
        this.startPickDate = { year, month, date };
      } else {
        this.startPickDate = this.compare;
        this.endPickDate = { year, month, date };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/panel.scss';

%active {
  color: #fff;
  &::after {
    position: absolute;
    top: 2px;
    bottom: 2px;
    display: inline-block;
    background-color: #f2f8ff;
    z-index: -2;
    content: '';
  }
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: 23px;
    height: 23px;
    background-color: #409eff;
    border-radius: 100%;
    z-index: -1;
    content: '';
    transform: translate(-50%, -50%);
  }
}

.VCalendar__panel {
  &__container {
    padding: 20px 10px;
    &.previous {
      &::before {
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        display: inline-block;
        width: 1px;
        background-color: #d2d0d0;
        content: '';
      }
    }
    &__date__wrapper {
      > div {
        &:hover,
        &.isToday {
          color: #409eff;
        }
        &.disabled {
          color: #ddd;
        }
        &:not(.disabled).active {
          @extend %active;
          &.equalFirst::after {
            right: 0px;
            left: 15px;
          }
          &.equalLast::after {
            right: 15px;
            left: 0px;
          }
          &.equalFirst.equalLast::after {
            right: 15px;
            left: 15px;
          }
        }
        &.inrange {
          &::before {
            position: absolute;
            top: 2px;
            bottom: 2px;
            right: 0px;
            left: 0px;
            display: inline-block;
            background-color: #f2f8ff;
            z-index: -1;
            content: '';
          }
        }
      }
    }
  }
}
</style>
