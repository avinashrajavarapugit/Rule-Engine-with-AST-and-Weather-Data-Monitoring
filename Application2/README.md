# Weather Data Monitoring and Alerts
This application monitors weather data for multiple cities using the OpenWeatherMap API, sends email alerts for high temperatures, and visualizes daily trends using Matplotlib.
 
## Prerequisites
- Python (v3.8+)
- OpenWeatherMap API Key
- Matplotlib
- Requests
- smtplib for email alerts


Create a Dockerfile for the Python script and run it using Docker Compose or directly.
docker build -t weather-monitor .
docker run weather-monitor


Install dependencies and run the Python script.
pip install -r requirements.txt
python weather_monitor.py

#Instructions

- Run the Python script: `python weather_monitor.py`
- The script fetches weather data every X minutes and checks if the temperature exceeds the threshold.
- Email alerts will be sent when high temperatures persist for consecutive intervals.


#Design Choice

- Weather Data Retrieval: OpenWeatherMap API to fetch real-time weather data.
- Email Alerts: smtplib to send email alerts when specific weather conditions are met.
- Data Visualization: Matplotlib to visualize temperature trends over time.

