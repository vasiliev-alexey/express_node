import { mailTransport } from './transport';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'mailer' });

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: `"Meadowlark Travel" ${process.env.postUser}@yandex.ru`,
      to: `${process.env.postReceiver}@mail.ru`,
      subject: 'Your Meadowlark Travel Tour',
      html:
        '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
        'Meadowlark Travel.  <b>We look forward to your visit!</b>',
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
