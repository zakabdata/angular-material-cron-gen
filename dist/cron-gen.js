(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var ACCEPTABLE_CRON_FORMATS = ['quartz'];
var DAY_LOOKUPS = {
    'SUN': 'Sunday',
    'MON': 'Monday',
    'TUE': 'Tuesday',
    'WED': 'Wednesday',
    'THU': 'Thursday',
    'FRI': 'Friday',
    'SAT': 'Saturday'
};
var MONTH_WEEK_LOOKUPS = {
    '#1': 'First',
    '#2': 'Second',
    '#3': 'Third',
    '#4': 'Fourth',
    '#5': 'Fifth',
    'L': 'Last'
};
var MONTH_LOOKUPS = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

var States = {
    INIT: 1,
    DIRTY: 2,
    CLEAN: 3
};

var CronGenComponent = function () {
    CronGenComponent.$inject = ["$scope", "cronGenService"];
    function CronGenComponent($scope, cronGenService) {
        'ngInject';

        var _this = this;

        classCallCheck(this, CronGenComponent);
        this.parsedOptions = this.mergeDefaultOptions(this.options);

        angular.extend(this, {
            cronGenService: cronGenService,
            cronFormat: 'quartz',
            currentState: States.INIT,
            activeTab: function () {
                if (!_this.parsedOptions.hideMinutesTab) {
                    return 'minutes';
                } else if (!_this.parsedOptions.hideHourlyTab) {
                    return 'hourly';
                } else if (!_this.parsedOptions.hideDailyTab) {
                    return 'daily';
                } else if (!_this.parsedOptions.hideWeeklyTab) {
                    return 'weekly';
                } else if (!_this.parsedOptions.hideMonthlyTab) {
                    return 'monthly';
                } else if (!_this.parsedOptions.hideYearlyTab) {
                    return 'yearly';
                } else if (!_this.parsedOptions.hideAdvancedTab) {
                    return 'advanced';
                }
                throw 'No tabs available to make active';
            }(),
            selectOptions: cronGenService.selectOptions(),
            state: {
                minutes: {
                    minutes: 1,
                    seconds: 0
                },
                hourly: {
                    hours: 1,
                    minutes: 0,
                    seconds: 0
                },
                daily: {
                    subTab: 'everyDays',
                    everyDays: {
                        days: 1,
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    },
                    everyWeekDay: {
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    }
                },
                weekly: {
                    MON: true,
                    TUE: false,
                    WED: false,
                    THU: false,
                    FRI: false,
                    SAT: false,
                    SUN: false,
                    hours: this.parsedOptions.use24HourTime ? 0 : 1,
                    minutes: 0,
                    seconds: 0,
                    hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                },
                monthly: {
                    subTab: 'specificDay',
                    specificDay: {
                        day: '1',
                        months: 1,
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    },
                    specificWeekDay: {
                        monthWeek: '#1',
                        day: 'MON',
                        months: 1,
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    }
                },
                yearly: {
                    subTab: 'specificMonthDay',
                    specificMonthDay: {
                        month: 1,
                        day: '1',
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    },
                    specificMonthWeek: {
                        monthWeek: '#1',
                        day: 'MON',
                        month: 1,
                        hours: this.parsedOptions.use24HourTime ? 0 : 1,
                        minutes: 0,
                        seconds: 0,
                        hourType: this.parsedOptions.use24HourTime ? null : 'AM'
                    }
                },
                advanced: {
                    expression: null
                }
            }
        });

        //Validate our opts
        if (ACCEPTABLE_CRON_FORMATS.indexOf(this.cronFormat) == -1) {
            throw 'Desired cron format (' + this.cronFormat + ') is not available';
        }

        //On model changes, update our state to reflect the user's input
        $scope.$watch('$ctrl.ngModel', function (cron) {
            return _this.handleModelChange(cron);
        });

        // Watch for option changes
        $scope.$watch('$ctrl.options', function (options) {
            return _this.parsedOptions = _this.mergeDefaultOptions(options);
        }, true);
    }

    createClass(CronGenComponent, [{
        key: '$onInit',
        value: function $onInit() {
            var _this2 = this;

            //If possible, add our cron expression validator to our form
            if (this.formCtrl && this.name) {
                this.ngModelCtrl.$validators.testCronExpr = function (expression) {
                    return _this2.cronGenService.isValid(_this2.cronFormat, expression);
                };
            }
        }
    }, {
        key: 'setActiveTab',
        value: function setActiveTab($event, tab) {
            $event.preventDefault();
            if (!this.ngDisabled) {
                this.activeTab = tab;
                this.regenerateCron();
            }
        }
    }, {
        key: 'dayDisplay',
        value: function dayDisplay(day) {
            return DAY_LOOKUPS[day];
        }
    }, {
        key: 'monthWeekDisplay',
        value: function monthWeekDisplay(monthWeekNumber) {
            return MONTH_WEEK_LOOKUPS[monthWeekNumber];
        }
    }, {
        key: 'monthDisplay',
        value: function monthDisplay(monthNumber) {
            return MONTH_LOOKUPS[monthNumber];
        }
    }, {
        key: 'monthDayDisplay',
        value: function monthDayDisplay(monthDay) {
            if (monthDay === 'L') {
                return 'Last Day';
            } else if (monthDay === 'LW') {
                return 'Last Weekday';
            } else if (monthDay === '1W') {
                return 'First Weekday';
            } else {
                return '' + monthDay + this.cronGenService.appendInt(monthDay) + ' Day';
            }
        }
    }, {
        key: 'processHour',
        value: function processHour(hours) {
            if (this.parsedOptions.use24HourTime) {
                return hours;
            } else {
                return (hours + 11) % 12 + 1;
            }
        }
    }, {
        key: 'getHourType',
        value: function getHourType(hours) {
            return this.parsedOptions.use24HourTime ? null : hours >= 12 ? 'PM' : 'AM';
        }
    }, {
        key: 'hourToCron',
        value: function hourToCron(hour, hourType) {
            if (this.parsedOptions.use24HourTime) {
                return hour;
            } else {
                return hourType === 'AM' ? hour === 12 ? 0 : hour : hour === 12 ? 12 : hour + 12;
            }
        }
    }, {
        key: 'mergeDefaultOptions',
        value: function mergeDefaultOptions(options) {
            return angular.extend({
                formInputClass: 'form-control cron-gen-input',
                formSelectClass: 'form-control cron-gen-select',
                formRadioClass: 'form-control-static cron-gen-radio',
                formCheckboxClass: 'form-control-static cron-gen-checkbox',
                hideMinutesTab: false,
                hideHourlyTab: false,
                hideDailyTab: false,
                hideWeeklyTab: false,
                hideMonthlyTab: false,
                hideYearlyTab: false,
                hideAdvancedTab: true,
                use24HourTime: false,
                hideSeconds: false
            }, options);
        }
    }, {
        key: 'regenerateCron',
        value: function regenerateCron() {
            var _this3 = this;

            this.currentState = States.DIRTY;
            switch (this.activeTab) {
                case 'minutes':
                    this.ngModel = this.state.minutes.seconds + ' 0/' + this.state.minutes.minutes + ' * 1/1 * ? *';
                    break;
                case 'hourly':
                    this.ngModel = this.state.hourly.seconds + ' ' + this.state.hourly.minutes + ' 0/' + this.state.hourly.hours + ' 1/1 * ? *';
                    break;
                case 'daily':
                    switch (this.state.daily.subTab) {
                        case 'everyDays':
                            this.ngModel = this.state.daily.everyDays.seconds + ' ' + this.state.daily.everyDays.minutes + ' ' + this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType) + ' 1/' + this.state.daily.everyDays.days + ' * ? *';
                            break;
                        case 'everyWeekDay':
                            this.ngModel = this.state.daily.everyWeekDay.seconds + ' ' + this.state.daily.everyWeekDay.minutes + ' ' + this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType) + ' ? * MON-FRI *';
                            break;
                        default:
                            throw 'Invalid cron daily subtab selection';
                    }
                    break;
                case 'weekly':
                    var days = this.selectOptions.days.reduce(function (acc, day) {
                        return _this3.state.weekly[day] ? acc.concat([day]) : acc;
                    }, []).join(',');
                    this.ngModel = this.state.weekly.seconds + ' ' + this.state.weekly.minutes + ' ' + this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType) + ' ? * ' + days + ' *';
                    break;
                case 'monthly':
                    switch (this.state.monthly.subTab) {
                        case 'specificDay':
                            this.ngModel = this.state.monthly.specificDay.seconds + ' ' + this.state.monthly.specificDay.minutes + ' ' + this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType) + ' ' + this.state.monthly.specificDay.day + ' 1/' + this.state.monthly.specificDay.months + ' ? *';
                            break;
                        case 'specificWeekDay':
                            this.ngModel = this.state.monthly.specificWeekDay.seconds + ' ' + this.state.monthly.specificWeekDay.minutes + ' ' + this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType) + ' ? 1/' + this.state.monthly.specificWeekDay.months + ' ' + this.state.monthly.specificWeekDay.day + this.state.monthly.specificWeekDay.monthWeek + ' *';
                            break;
                        default:
                            throw 'Invalid cron monthly subtab selection';
                    }
                    break;
                case 'yearly':
                    switch (this.state.yearly.subTab) {
                        case 'specificMonthDay':
                            this.ngModel = this.state.yearly.specificMonthDay.seconds + ' ' + this.state.yearly.specificMonthDay.minutes + ' ' + this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType) + ' ' + this.state.yearly.specificMonthDay.day + ' ' + this.state.yearly.specificMonthDay.month + ' ? *';
                            break;
                        case 'specificMonthWeek':
                            this.ngModel = this.state.yearly.specificMonthWeek.seconds + ' ' + this.state.yearly.specificMonthWeek.minutes + ' ' + this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType) + ' ? ' + this.state.yearly.specificMonthWeek.month + ' ' + this.state.yearly.specificMonthWeek.day + this.state.yearly.specificMonthWeek.monthWeek + ' *';
                            break;
                        default:
                            throw 'Invalid cron yearly subtab selection';
                    }
                    break;
                case 'advanced':
                    this.ngModel = this.state.advanced.expression;
                    break;
                default:
                    throw 'Invalid cron active tab selection';
            }
        }
    }, {
        key: 'handleModelChange',
        value: function handleModelChange(cron) {
            var _this4 = this;

            this.state.advanced.expression = cron;

            if (this.currentState === States.DIRTY) {
                this.currentState = States.CLEAN;
                return;
            } else {
                this.currentState = States.CLEAN;
            }

            var segments = cron.split(' ');
            if (segments.length === 6 || segments.length === 7) {
                var _segments = slicedToArray(segments, 6),
                    seconds = _segments[0],
                    minutes = _segments[1],
                    hours = _segments[2],
                    dayOfMonth = _segments[3],
                    month = _segments[4],
                    dayOfWeek = _segments[5];

                if (cron.match(/\d+ 0\/\d+ \* 1\/1 \* \? \*/)) {
                    this.activeTab = 'minutes';
                    this.state.minutes.minutes = parseInt(minutes.substring(2));
                    this.state.minutes.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ 0\/\d+ 1\/1 \* \? \*/)) {
                    this.activeTab = 'hourly';
                    this.state.hourly.hours = parseInt(hours.substring(2));
                    this.state.hourly.minutes = parseInt(minutes);
                    this.state.hourly.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \* \? \*/)) {
                    this.activeTab = 'daily';
                    this.state.daily.subTab = 'everyDays';
                    this.state.daily.everyDays.days = parseInt(dayOfMonth.substring(2));
                    var parsedHours = parseInt(hours);
                    this.state.daily.everyDays.hours = this.processHour(parsedHours);
                    this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
                    this.state.daily.everyDays.minutes = parseInt(minutes);
                    this.state.daily.everyDays.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
                    this.activeTab = 'daily';
                    this.state.daily.subTab = 'everyWeekDay';
                    var _parsedHours = parseInt(hours);
                    this.state.daily.everyWeekDay.hours = this.processHour(_parsedHours);
                    this.state.daily.everyWeekDay.hourType = this.getHourType(_parsedHours);
                    this.state.daily.everyWeekDay.minutes = parseInt(minutes);
                    this.state.daily.everyWeekDay.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
                    this.activeTab = 'weekly';
                    this.selectOptions.days.forEach(function (weekDay) {
                        return _this4.state.weekly[weekDay] = false;
                    });
                    dayOfWeek.split(',').forEach(function (weekDay) {
                        return _this4.state.weekly[weekDay] = true;
                    });
                    var _parsedHours2 = parseInt(hours);
                    this.state.weekly.hours = this.processHour(_parsedHours2);
                    this.state.weekly.hourType = this.getHourType(_parsedHours2);
                    this.state.weekly.minutes = parseInt(minutes);
                    this.state.weekly.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ \? \*/)) {
                    this.activeTab = 'monthly';
                    this.state.monthly.subTab = 'specificDay';
                    this.state.monthly.specificDay.day = dayOfMonth;
                    this.state.monthly.specificDay.months = parseInt(month.substring(2));
                    var _parsedHours3 = parseInt(hours);
                    this.state.monthly.specificDay.hours = this.processHour(_parsedHours3);
                    this.state.monthly.specificDay.hourType = this.getHourType(_parsedHours3);
                    this.state.monthly.specificDay.minutes = parseInt(minutes);
                    this.state.monthly.specificDay.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ \? 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
                    var day = dayOfWeek.substr(0, 3);
                    var monthWeek = dayOfWeek.substr(3);
                    this.activeTab = 'monthly';
                    this.state.monthly.subTab = 'specificWeekDay';
                    this.state.monthly.specificWeekDay.monthWeek = monthWeek;
                    this.state.monthly.specificWeekDay.day = day;
                    this.state.monthly.specificWeekDay.months = parseInt(month.substring(2));
                    var _parsedHours4 = parseInt(hours);
                    this.state.monthly.specificWeekDay.hours = this.processHour(_parsedHours4);
                    this.state.monthly.specificWeekDay.hourType = this.getHourType(_parsedHours4);
                    this.state.monthly.specificWeekDay.minutes = parseInt(minutes);
                    this.state.monthly.specificWeekDay.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ \? \*/)) {
                    this.activeTab = 'yearly';
                    this.state.yearly.subTab = 'specificMonthDay';
                    this.state.yearly.specificMonthDay.month = parseInt(month);
                    this.state.yearly.specificMonthDay.day = dayOfMonth;
                    var _parsedHours5 = parseInt(hours);
                    this.state.yearly.specificMonthDay.hours = this.processHour(_parsedHours5);
                    this.state.yearly.specificMonthDay.hourType = this.getHourType(_parsedHours5);
                    this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
                    this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
                } else if (cron.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
                    var _day = dayOfWeek.substr(0, 3);
                    var _monthWeek = dayOfWeek.substr(3);
                    this.activeTab = 'yearly';
                    this.state.yearly.subTab = 'specificMonthWeek';
                    this.state.yearly.specificMonthWeek.monthWeek = _monthWeek;
                    this.state.yearly.specificMonthWeek.day = _day;
                    this.state.yearly.specificMonthWeek.month = parseInt(month);
                    var _parsedHours6 = parseInt(hours);
                    this.state.yearly.specificMonthWeek.hours = this.processHour(_parsedHours6);
                    this.state.yearly.specificMonthWeek.hourType = this.getHourType(_parsedHours6);
                    this.state.yearly.specificMonthWeek.minutes = parseInt(minutes);
                    this.state.yearly.specificMonthWeek.seconds = parseInt(seconds);
                } else {
                    this.activeTab = 'advanced';
                    this.state.advanced.expression = cron;
                }
            } else {
                throw 'Unsupported cron expression. Expression must be 6 or 7 segments';
            }
        }
    }]);
    return CronGenComponent;
}();

var QUARTZ_REGEX = /^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?(?:,(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$/;

var CronGenService = function () {
    function CronGenService() {
        classCallCheck(this, CronGenService);
    }

    createClass(CronGenService, [{
        key: 'isValid',
        value: function isValid(cronFormat, expression) {
            var formattedExpression = expression.toUpperCase();
            switch (cronFormat) {
                case 'quartz':
                    return !!formattedExpression.match(QUARTZ_REGEX);
                default:
                    throw 'Desired cron format (' + cronFormat + ') is not available';
            }
        }
    }, {
        key: 'appendInt',
        value: function appendInt(number) {
            var value = '' + number;
            if (value.length > 1) {
                var secondToLastDigit = value.charAt(value.length - 2);
                if (secondToLastDigit === '1') {
                    return "th";
                }
            }
            var lastDigit = value.charAt(value.length - 1);
            switch (lastDigit) {
                case '1':
                    return "st";
                case '2':
                    return "nd";
                case '3':
                    return "rd";
                default:
                    return "th";
            }
        }
    }, {
        key: 'padNumber',
        value: function padNumber(number) {
            return ('' + number).length === 1 ? '0' + number : '' + number;
        }
    }, {
        key: 'range',
        value: function range(start, end) {
            if (typeof end === 'undefined') {
                end = start;
                start = 0;
            }

            if (start < 0 || end < 0) throw 'Range values must be positive values';

            if (end > start) {
                return [].concat(toConsumableArray(new Array(end - start))).map(function (val, idx) {
                    return idx + start;
                });
            } else if (start < end) {
                return [].concat(toConsumableArray(new Array(start - end))).map(function (val, idx) {
                    return end - idx;
                });
            } else return new Array();
        }
    }, {
        key: 'selectOptions',
        value: function selectOptions() {
            return {
                months: this.range(1, 12),
                monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
                days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                minutes: this.range(1, 60),
                fullMinutes: this.range(60),
                seconds: this.range(60),
                hours: this.range(1, 23),
                monthDays: this.range(1, 31),
                monthDaysWithLasts: ['1W'].concat(toConsumableArray([].concat(toConsumableArray(new Array(28))).map(function (val, idx) {
                    return '' + (idx + 1);
                })), ['LW', 'L'])
            };
        }
    }]);
    return CronGenService;
}();

var CronGenTimeSelect = function CronGenTimeSelect($scope, cronGenService) {
    'ngInject';

    var _this = this;

    classCallCheck(this, CronGenTimeSelect);
    this.cronGenService = cronGenService;

    this.selectOptions = {
        minutes: cronGenService.range(60),
        seconds: cronGenService.range(60),
        hourTypes: ['AM', 'PM']
    };

    $scope.$watch('$ctrl.use24HourTime', function () {
        _this.selectOptions.hours = _this.use24HourTime ? _this.cronGenService.range(24) : _this.cronGenService.range(12);
    });
};
CronGenTimeSelect.$inject = ["$scope", "cronGenService"];

angular.module('angular-cron-gen', []).service('cronGenService', CronGenService).component('cronGenTimeSelect', {
    bindings: {
        isDisabled: '<',
        onChange: '&',
        isRequired: '<',
        model: '=',
        selectClass: '<',
        use24HourTime: '<',
        hideSeconds: '<',
        namePrefix: '@'
    },
    templateUrl: 'angular-cron-gen/cron-gen-time-select.html',
    controller: CronGenTimeSelect
}).component('cronGen', {
    bindings: {
        ngModel: '=',
        ngDisabled: '<',
        options: '<',
        cronFormat: '@',
        templateUrl: '@',
        name: '@'
    },
    require: {
        ngModelCtrl: 'ngModel',
        ngDisabledCtrl: '?ngDisabled',
        formCtrl: '^?form'
    },
    templateUrl: ["$attrs", function templateUrl($attrs) {
        'ngInject';

        return $attrs.templateUrl || 'angular-cron-gen/cron-gen.html';
    }],

    controller: CronGenComponent
});

}());

angular.module('angular-cron-gen').run(['$templateCache', function($templateCache) {$templateCache.put('angular-cron-gen/cron-gen-time-select.html','<div class="inline-block">\n    <select class="hours"\n            name="{{namePrefix}}Hours"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.hours"\n            ng-options="hour as $ctrl.cronGenService.padNumber(hour) for hour in $ctrl.selectOptions.hours"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="minutes"\n            name="{{namePrefix}}Minutes"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.minutes"\n            ng-options="minute as $ctrl.cronGenService.padNumber(minute) for minute in $ctrl.selectOptions.minutes"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="seconds"\n            name="{{namePrefix}}Seconds"\n            ng-show="!$ctrl.hideSeconds"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-required="$ctrl.isRequired"\n            ng-model="$ctrl.model.seconds"\n            ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n            ng-class="$ctrl.selectClass">\n    </select>\n    <select class="hour-types"\n            name="{{namePrefix}}HourType"\n            ng-show="!$ctrl.use24HourTime"\n            ng-disabled="$ctrl.isDisabled"\n            ng-change="$ctrl.onChange()"\n            ng-model="$ctrl.model.hourType"\n            ng-options="hourType as hourType for hourType in $ctrl.selectOptions.hourTypes"\n            ng-required="$ctrl.isRequired"\n            ng-class="$ctrl.selectClass">\n    </select>\n</div>');
$templateCache.put('angular-cron-gen/cron-gen.html','<!doctype html>\n<div class="cron-gen-main" ng-cloak>\n    <ul class="nav nav-tabs tab-nav" role="tablist">\n        <li ng-class="{\'active\': $ctrl.activeTab === \'minutes\'}"\n            ng-show="!$ctrl.parsedOptions.hideMinutesTab"\n            role="presentation">\n            <a href="#"\n               aria-controls="minutes"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'minutes\')">\n                Minutes\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideHourlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'hourly\'}">\n            <a href="#"\n               aria-controls="hourly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'hourly\')">\n                Hourly\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideDailyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'daily\'}">\n            <a href="#"\n               aria-controls="daily"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'daily\')">\n                Daily\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideWeeklyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'weekly\'}">\n            <a href="#" aria-controls="weekly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'weekly\')">\n                Weekly\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideMonthlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'monthly\'}">\n            <a href="#"\n               aria-controls="monthly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'monthly\')">\n                Monthly\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideYearlyTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'yearly\'}">\n            <a href="#"\n               aria-controls="yearly"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'yearly\')">\n                Yearly\n            </a>\n        </li>\n        <li role="presentation"\n            ng-show="!$ctrl.parsedOptions.hideAdvancedTab"\n            ng-class="{\'active\': $ctrl.activeTab === \'advanced\'}">\n            <a href="#"\n               aria-controls="advanced"\n               role="tab"\n               data-toggle="tab"\n               ng-click="$ctrl.setActiveTab($event, \'advanced\')">\n                Advanced\n            </a>\n        </li>\n    </ul>\n    <div class="cron-gen-container">\n        <div class="row">\n            <div class="col-xs-12">\n                <div class="tab-content">\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideMinutesTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'minutes\'}">\n                        <div class="well well-small">\n                            Every\n                            <select class="minutes"\n                                    name="minutesMinutes"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'minutes\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.minutes.minutes"\n                                    ng-required="$ctrl.activeTab === \'minutes\'"\n                                    ng-options="minute as minute for minute in $ctrl.selectOptions.minutes"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            minute(s)\n                            <span ng-show="!$ctrl.parsedOptions.hideSeconds">on second</span>\n                            <select class="seconds"\n                                    name="minutesSeconds"\n                                    ng-show="!$ctrl.parsedOptions.hideSeconds"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'minutes\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.minutes.seconds"\n                                    ng-required="$ctrl.activeTab === \'minutes\'"\n                                    ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideHourlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'hourly\'}">\n                        <div class="well well-small">\n                            Every\n                            <select class="hours"\n                                    name="hourlyHours"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.hours"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="hour as hour for hour in $ctrl.selectOptions.hours"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            hour(s) on minute\n                            <select class="minutes"\n                                    name="hourlyMinutes"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.minutes"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="minute as $ctrl.cronGenService.padNumber(minute) for minute in $ctrl.selectOptions.fullMinutes"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <span ng-show="!$ctrl.parsedOptions.hideSeconds">and second</span>\n                            <select class="seconds"\n                                    name="hourlySeconds"\n                                    ng-show="!$ctrl.parsedOptions.hideSeconds"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'hourly\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.hourly.seconds"\n                                    ng-required="$ctrl.activeTab === \'hourly\'"\n                                    ng-options="second as $ctrl.cronGenService.padNumber(second) for second in $ctrl.selectOptions.seconds"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideDailyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'daily\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="everyDays"\n                                   name="daily-radio"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.daily.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   checked="checked">\n                            Every\n                            <select class="days"\n                                    name="dailyEveryDaysDays"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyDays\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.daily.everyDays.days"\n                                    ng-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyDays\'"\n                                    ng-options="monthDay as monthDay for monthDay in $ctrl.selectOptions.monthDays"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            day(s) at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyDays\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="dailyEveryDays"\n                                    is-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyDays\'"\n                                    model="$ctrl.state.daily.everyDays"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="everyWeekDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.daily.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="daily-radio">\n                            Every week day (Monday through Friday) at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'daily\' || $ctrl.state.daily.subTab !== \'everyWeekDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="dailyEveryWeekDay"\n                                    is-required="$ctrl.activeTab === \'daily\' && $ctrl.state.daily.subTab === \'everyWeekDay\'"\n                                    model="$ctrl.state.daily.everyWeekDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideWeeklyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'weekly\'}">\n                        <div class="well well-small row">\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyMON"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.MON"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Monday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyTUE"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.TUE"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Tuesday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyWED"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.WED"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Wednesday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyTHU"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.THU"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Thursday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklyFRI"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.FRI"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Friday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklySAT"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.SAT"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Saturday\n                            </div>\n                            <div class="col-sm-6">\n                                <input type="checkbox"\n                                       name="weeklySUN"\n                                       ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                       ng-change="$ctrl.regenerateCron()"\n                                       ng-model="$ctrl.state.weekly.SUN"\n                                       ng-class="$ctrl.parsedOptions.formCheckboxClass">\n                                Sunday\n                            </div>\n                        </div>\n                        Start time\n                        <cron-gen-time-select\n                                is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'weekly\'"\n                                on-change="$ctrl.regenerateCron()"\n                                name-prefix="weekly"\n                                is-required="$ctrl.activeTab === \'weekly\'"\n                                model="$ctrl.state.weekly"\n                                select-class="$ctrl.parsedOptions.formSelectClass"\n                                use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                        </cron-gen-time-select>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideMonthlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'monthly\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.monthly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="monthly-radio"\n                                   checked="checked">\n                            On the\n                            <select class="month-days"\n                                    name="monthlySpecificDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificDay.day"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    ng-options="monthDaysWithLast as $ctrl.monthDayDisplay(monthDaysWithLast) for monthDaysWithLast in $ctrl.selectOptions.monthDaysWithLasts"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            of every\n                            <select class="months-small"\n                                    name="monthlySpecificDayMonths"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificDay.months"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    ng-options="month as month for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            month(s) at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="monthlySpecificDay"\n                                    is-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificDay\'"\n                                    model="$ctrl.state.monthly.specificDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificWeekDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.monthly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="monthly-radio">\n                            On the\n                            <select class="day-order-in-month"\n                                    name="monthlySpecificWeekDayMonthWeek"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.monthWeek"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="monthWeek as $ctrl.monthWeekDisplay(monthWeek) for monthWeek in $ctrl.selectOptions.monthWeeks"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <select class="week-days"\n                                    name="monthlySpecificWeekDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.day"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="day as $ctrl.dayDisplay(day) for day in $ctrl.selectOptions.days"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            of every\n                            <select class="months-small"\n                                    name="monthlySpecificWeekDayMonths"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.monthly.specificWeekDay.months"\n                                    ng-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    ng-options="month as month for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            month(s) at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'monthly\' || $ctrl.state.monthly.subTab !== \'specificWeekDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="monthlySpecificWeekDay"\n                                    is-required="$ctrl.activeTab === \'monthly\' && $ctrl.state.monthly.subTab === \'specificWeekDay\'"\n                                    model="$ctrl.state.monthly.specificWeekDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideYearlyTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'yearly\'}">\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificMonthDay"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.yearly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="yearly-radio">\n                            Every\n                            <select class="months"\n                                    name="yearlySpecificMonthDayMonth"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthDay.month"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    ng-options="month as $ctrl.monthDisplay(month) for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            on the\n                            <select class="month-days"\n                                    name="yearlySpecificMonthDayDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthDay.day"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    ng-options="monthDaysWithLast as $ctrl.monthDayDisplay(monthDaysWithLast) for monthDaysWithLast in $ctrl.selectOptions.monthDaysWithLasts"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthDay\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    is-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthDay\'"\n                                    name-prefix="yearlySpecificMonthDay"\n                                    model="$ctrl.state.yearly.specificMonthDay"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                        <div class="well well-small">\n                            <input type="radio"\n                                   value="specificMonthWeek"\n                                   ng-disabled="$ctrl.ngDisabled"\n                                   ng-change="$ctrl.regenerateCron()"\n                                   ng-model="$ctrl.state.yearly.subTab"\n                                   ng-class="$ctrl.state.formRadioClass"\n                                   name="yearly-radio">\n                            On the\n                            <select class="day-order-in-month"\n                                    name="yearlySpecificMonthWeekMonthWeek"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.monthWeek"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="monthWeek as $ctrl.monthWeekDisplay(monthWeek) for monthWeek in $ctrl.selectOptions.monthWeeks"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            <select class="week-days"\n                                    name="yearlySpecificMonthWeekMonthDay"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.day"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="day as $ctrl.dayDisplay(day) for day in $ctrl.selectOptions.days"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            of\n                            <select class="months"\n                                    name="yearlySpecificMonthWeekMontMonth"\n                                    ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    ng-change="$ctrl.regenerateCron()"\n                                    ng-model="$ctrl.state.yearly.specificMonthWeek.month"\n                                    ng-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    ng-options="month as $ctrl.monthDisplay(month) for month in $ctrl.selectOptions.months"\n                                    ng-class="$ctrl.parsedOptions.formSelectClass">\n                            </select>\n                            at\n                            <cron-gen-time-select\n                                    is-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'yearly\' || $ctrl.state.yearly.subTab !== \'specificMonthWeek\'"\n                                    on-change="$ctrl.regenerateCron()"\n                                    name-prefix="yearlySpecificMonthWeek"\n                                    is-required="$ctrl.activeTab === \'yearly\' && $ctrl.state.yearly.subTab === \'specificMonthWeek\'"\n                                    model="$ctrl.state.yearly.specificMonthWeek"\n                                    select-class="$ctrl.parsedOptions.formSelectClass"\n                                    use-24-hour-time="$ctrl.parsedOptions.use24HourTime"\n                                    hide-seconds="$ctrl.parsedOptions.hideSeconds">\n                            </cron-gen-time-select>\n                        </div>\n                    </div>\n                    <div class="tab-pane"\n                         ng-show="!$ctrl.parsedOptions.hideAdvancedTab"\n                         ng-class="{\'active\': $ctrl.activeTab === \'advanced\'}">\n                        Cron Expression\n                        <input type="text"\n                               class="advanced-cron-gen-input"\n                               name="advancedExpression"\n                               ng-disabled="$ctrl.ngDisabled || $ctrl.activeTab !== \'advanced\'"\n                               ng-change="$ctrl.regenerateCron()"\n                               ng-model="$ctrl.state.advanced.expression"\n                               ng-required="$ctrl.activeTab === \'advanced\'"\n                               ng-class="$ctrl.parsedOptions.formInputClass">\n\n                        <p>More details about how to create these expressions can be found <a\n                                href="http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger.html"\n                                target="_blank">here</a>.</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n');}]);