import { Logger } from 'tslog';
import { mailTransport } from './transport';
const log: Logger = new Logger({ name: 'mailer' });

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: `"Meadowlark Travel" ${process.env.postUser}@yandex.ru`,

      to: `${process.env.postReceiver}@mail.ru`,
      subject: 'Your Meadowlark Travel Tour',
      text:
        'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    });
    log.info('mail sent successfully: ', result);
  } catch (err) {
    log.info('could not send mail: ' + err.message);
  }
}

go();
