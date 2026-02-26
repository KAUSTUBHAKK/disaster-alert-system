import json
import boto3
import datetime

s3 = boto3.client('s3')

def lambda_handler(event, context):
    alert_data = {
        "type": "Flood",
        "severity": "High",
        "location": {
            "lat": 18.5204,
            "lng": 73.8567
        },
        "timestamp": str(datetime.datetime.utcnow())
    }

    s3.put_object(
        Bucket="your-bucket-name",
        Key="alerts/latest_alert.json",
        Body=json.dumps(alert_data),
        ContentType="application/json"
    )

    return {
        "statusCode": 200,
        "body": json.dumps("Alert stored successfully!")
    }
