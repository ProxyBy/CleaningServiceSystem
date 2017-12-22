const Regularity = require('../config/regularityEnum');

export class DateUtills {
    public getDatesFromDays: Function = (days: any, regularity: any, dueDate: any) => {
        var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var indexesOfInputDays: any[] = [];
        var start = new Date();
        var end = new Date(dueDate);
        var step: number;
        var allDates: any[] = [];
        var dates: any[] = [];
        var dayCounter: number = 0;

          for (let day of days) {
              indexesOfInputDays.push(dayOfWeek.indexOf(day))
          }

          switch (regularity) {
              case Regularity.ONCE:
                  end = new Date();
                  end.setDate(start.getDate() + 7);
                  break;
              case Regularity.EVERY_WEEK:
                  break;
              case Regularity.EVERY_TWO_WEEK:
                  step = 7;
                  break;
              case Regularity.EVERY_MONTH:
                  step = 30;
                  break;
          }

          while (start < end) {
              console.log(start);
              allDates.push(start);
              var newDate = start.setDate(start.getDate() + 1);
              start = new Date(newDate);
          }

          for (let i = 0; i < allDates.length; i++) {
              if (indexesOfInputDays.indexOf(allDates[i].getDay()) != -1) {
                  dates.push(allDates[i].toLocaleDateString());
              }
              if (dayCounter < 7) {
                  dayCounter++;
              } else {
                  dayCounter = 0;
                  i = i + step;
              }
          }
          return dates;
    };
}