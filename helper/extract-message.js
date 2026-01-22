function extractMessage(data) {
    const results = data.data.analysis && data.data.analysis.data_collection_results
    
    if (results?.status?.value === false) {
        return {
            whatsappMessage: 'No data collection results found.',
            emailHtml: '<p>No data collection results found.</p>',
            error: true,
        }
    }

    const name = results?.name?.value ?? 'Unknown'
    const phone = results?.contact_number?.value ?? 'Unknown'
    const date_time = results?.booking_time_and_date?.value ?? 'Unknown'
    const table = results?.table?.value ?? 'Unknown'
    const order = results?.order?.value ?? 'Unknown'
    const convId = data.conversation_id ?? ''

    const whatsappMessage = [
        `New reservation received`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Date & Time: ${date_time}`,
        `No. Of People: ${table}`,
        `Pre-Order Request: ${order}`,
        convId ? `Reference: ${convId}` : ''
    ].filter(Boolean).join('\n')

    const emailHtml = `<p><strong>New reservation received</strong></p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Date & Time:</strong> ${date_time}</li>
      <li><strong>No. Of People:</strong> ${table}</li>
      <li><strong>Pre-Order Request:</strong> ${order}</li>
      ${convId ? `<li><strong>Reference:</strong> ${convId}</li>` : ''}
    </ul>`
    return { whatsappMessage, emailHtml, error: false}
}


module.exports = { extractMessage }