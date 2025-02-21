// Returns an array of Date objects representing the start of consecutive weeks
// relative to the current week. For example, show 3 weeks before and 3 weeks after.
function getWeekStartDates(weeksBefore = 3, weeksAfter = 3) {
    const currentDate = new Date();
    // Adjust this logic depending on which day you consider week start.
    // Below example sets Monday (1) as the start of the week:
    const day = currentDate.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1; // how many days since the last Monday
    const currentMonday = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - diffToMonday
    );

    // Collect week start dates
    const weeks = [];

    // Generate "weeksBefore" weeks in the past
    for (let i = weeksBefore; i > 0; i--) {
        const d = new Date(currentMonday);
        d.setDate(currentMonday.getDate() - i * 7);
        weeks.push(d);
    }

    // Current week
    weeks.push(currentMonday);

    // Generate "weeksAfter" weeks in the future
    for (let i = 1; i <= weeksAfter; i++) {
        const d = new Date(currentMonday);
        d.setDate(currentMonday.getDate() + i * 7);
        weeks.push(d);
    }

    return weeks;
}

function getCurrentMonday(): Date {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // If today is Sunday (day = 0), subtract 6 days; else subtract (day - 1).
    const diff = day === 0 ? 6 : day - 1;
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - diff
    );
}

export { getWeekStartDates, getCurrentMonday };
