import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class NotificationsService {

    launchNotification(title: string, body: string) {
        var notification = new Notification(title, {
            body: body,
            //icon: '/src/assets/timeout-icon.svg'
        });
    }
    reqNotificationPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
        } else if (Notification.permission === 'granted') {
            console.log('Notifications are enabled in this browser');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notifications are now enabled');
                }
            });
        } else {
            console.log('Notifications are blocked in this browser');
        }


    }
}