function extractMessage(data) {
    const results = data.analysis && data.analysis.data_collection_results
    
    if (!results) {
        return {
            whatsappMessage: 'No data collection results found.',
            emailHtml: '<p>No data collection results found.</p>',
            error: true,
        }
    }

    const name = results?.collected_name ?? 'Unknown'
    const phone = results?.collected_contact_phone ?? 'Unknown'
    const date = results?.collected_booking_date ?? 'Unknown'
    const time = results?.collected_booking_time ?? 'Unknown'
    const party = results?.collected_party_size ?? 'Unknown'
    const convId = data.conversation_id ?? ''

    const whatsappMessage = [
        `New reservation received`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Date: ${date}`,
        `Time: ${time}`,
        `Party size: ${party}`,
        convId ? `Reference: ${convId}` : ''
    ].filter(Boolean).join('\n')

    const emailHtml = `<p><strong>New reservation received</strong></p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Party size:</strong> ${party}</li>
      ${convId ? `<li><strong>Reference:</strong> ${convId}</li>` : ''}
    </ul>`
    return { whatsappMessage, emailHtml, error: false}
}


module.exports = { extractMessage }