type Input = Array<any>;
export const arraySum = (input: Input): number => {
    return input.reduce((sum, current) => {
    if (typeof current === 'number' && !isNaN(current)) {
        return sum + current;
    } else if (Array.isArray(current)) {
        return sum + arraySum(current);
    } else {
        return sum;
        }
    }, 0);
    };