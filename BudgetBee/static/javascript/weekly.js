
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw==" crossorigin="anonymous"></script>


let myChart = null; // global reference to the chart

const renderCharts = (data, labels) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy existing chart if any
    if (myChart !== null) {
        myChart.destroy();
    }

    // Create new chart
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Last one month expense',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                radius: 150
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Expense per Category',
            }
        }
    });
};

const getChartData = () => {
    console.log('Fetching chart data...');
    fetch('/expense_week')
        .then(res => res.json())
        .then(results => {
            console.log("Chart results:", results);
            const category_data = results.expense_category_data;
            const [labels, data] = [Object.keys(category_data), Object.values(category_data)];

            renderCharts(data, labels);

            // Show used savings if available
            if (results.savings_used !== undefined) {
                let savingsElement = document.getElementById('savings-used');
                if (savingsElement) {
                    savingsElement.innerText = results.savings_used;
                }
            }
        })
        .catch(error => {
            console.error("Error fetching chart data:", error);
        });
};

// Correct event to trigger on DOM load
document.addEventListener('DOMContentLoaded', getChartData);
</script>
