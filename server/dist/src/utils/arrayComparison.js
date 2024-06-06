//NOTE: Order Matters
export default (a, b, is_object = false, is_two_dimensional = false) => {
    if (a == null || b == null)
        return false;
    if (a.length != b.length)
        return false;
    for (let i in a) {
        if (is_object) {
            if (JSON.stringify(a[i]) != JSON.stringify(b[i])) {
                return false;
                break;
            }
        }
        else if (is_two_dimensional) {
            for (let j in a[i]) {
                if (a[i][j] != b[i][j]) {
                    return false;
                    break;
                }
            }
        }
        else {
            if (a[i] != b[i]) {
                return false;
                break;
            }
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlDb21wYXJpc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2FycmF5Q29tcGFyaXNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxxQkFBcUI7QUFFckIsZUFBZSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsU0FBUyxHQUFDLEtBQUssRUFBRSxrQkFBa0IsR0FBQyxLQUFLLEVBQUMsRUFBRTtJQUVoRSxJQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUN2QyxJQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUVyQyxLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztRQUVkLElBQUcsU0FBUyxFQUFDO1lBRVosSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBRS9DLE9BQU8sS0FBSyxDQUFBO2dCQUVaLE1BQUs7YUFDTDtTQUNEO2FBQ0ksSUFBRyxrQkFBa0IsRUFBQztZQUUxQixLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFFakIsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO29CQUVyQixPQUFPLEtBQUssQ0FBQTtvQkFFWixNQUFLO2lCQUNMO2FBQ0Q7U0FDRDthQUNHO1lBRUgsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUVmLE9BQU8sS0FBSyxDQUFBO2dCQUVaLE1BQUs7YUFDTDtTQUNEO0tBRUQ7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNaLENBQUMsQ0FBQSJ9