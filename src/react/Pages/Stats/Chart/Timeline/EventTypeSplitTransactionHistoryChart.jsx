import React from "react";
import { Bar } from "react-chartjs-2";
import {
    bunqMeTabColor,
    masterCardPaymentColor,
    maestroPaymentColor,
    tapAndPayPaymentColor,
    applePayPaymentColor,
    paymentColor,
    requestInquiryColor,
    requestResponseColor
} from "../../Colors";
import { moneyTemplate, sortLinearChartTooltips } from "../../../../Functions/StatsFormattingTemplates";

export default props => {
    const defaultOptions = {
        height: 350,
        style: {
            margin: 12
        },
        ...props
    };

    const barChartInfo = (showAxis = false, changes = {}) => {
        return {
            stacked: true,
            display: showAxis,
            position: "left",
            type: "linear",
            gridLines: {
                display: showAxis
            },
            ticks: {
                fontColor: props.theme.palette.text.primary,
                beginAtZero: true,
                callback: value => {
                    // only show integer values
                    if (value % 1 === 0) {
                        return value;
                    }
                }
            },
            ...changes
        };
    };

    const dataSets = [
        {
            label: "Payments",
            data: props.paymentTransactionHistory,
            backgroundColor: paymentColor,
            borderColor: paymentColor,
            hoverBackgroundColor: paymentColor,
            hoverBorderColor: paymentColor
        },
        {
            label: "Apple Pay",
            data: props.applePayPaymentTransactionHistory,
            backgroundColor: applePayPaymentColor,
            borderColor: applePayPaymentColor,
            hoverBackgroundColor: applePayPaymentColor,
            hoverBorderColor: applePayPaymentColor
        },
        {
            label: "Tap & Pay",
            data: props.tapAndPayPaymentTransactionHistory,
            backgroundColor: tapAndPayPaymentColor,
            borderColor: tapAndPayPaymentColor,
            hoverBackgroundColor: tapAndPayPaymentColor,
            hoverBorderColor: tapAndPayPaymentColor
        },
        {
            label: "Sent Requests",
            data: props.requestInquiryTransactionHistory,
            backgroundColor: requestInquiryColor,
            borderColor: requestInquiryColor,
            hoverBackgroundColor: requestInquiryColor,
            hoverBorderColor: requestInquiryColor
        },
        {
            label: "Received Requests",
            data: props.requestResponseTransactionHistory,
            backgroundColor: requestResponseColor,
            borderColor: requestResponseColor,
            hoverBackgroundColor: requestResponseColor,
            hoverBorderColor: requestResponseColor
        },
        {
            label: "MasterCard",
            data: props.masterCardPaymentTransactionHistory,
            backgroundColor: masterCardPaymentColor,
            borderColor: masterCardPaymentColor,
            hoverBackgroundColor: masterCardPaymentColor,
            hoverBorderColor: masterCardPaymentColor
        },
        {
            label: "Maestro",
            data: props.maestroPaymentTransactionHistory,
            backgroundColor: maestroPaymentColor,
            borderColor: maestroPaymentColor,
            hoverBackgroundColor: maestroPaymentColor,
            hoverBorderColor: maestroPaymentColor
        },
        {
            label: "bunq.me Tabs",
            data: props.bunqMeTabTransactionHistory,
            backgroundColor: bunqMeTabColor,
            borderColor: bunqMeTabColor,
            hoverBackgroundColor: bunqMeTabColor,
            hoverBorderColor: bunqMeTabColor
        }
    ];

    const yAxes = [
        barChartInfo(true),
        barChartInfo(false),
        barChartInfo(false),
        barChartInfo(false),
        barChartInfo(false),
        barChartInfo(false),
        barChartInfo(false),
        barChartInfo(false)
    ];

    const chartData = {
        labels: props.labels,
        datasets: dataSets
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
            itemSort: sortLinearChartTooltips,
            callbacks: {
                label: function(tooltipItem, chart) {
                    const datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || "";
                    return `${datasetLabel}: ${moneyTemplate(tooltipItem.yLabel)}`;
                }
            }
        },
        legend: {
            labels: {
                fontColor: props.theme.palette.text.primary
            }
        },
        scales: {
            xAxes: [
                {
                    stacked: true,
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        fontColor: props.theme.palette.text.primary
                    },
                    labels: props.labels
                }
            ],
            yAxes: yAxes
        }
    };

    return <Bar height={defaultOptions.height} data={chartData} options={chartOptions} />;
};
