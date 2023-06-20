import React, { useState, useEffect } from 'react'
import pdfMake from './build/pdfmake/pdfmake'
import pdfFonts from './build/vfs_fonts'
import './App.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs

function App() {
const [formData, setFormData] = useState({
  recipientFirstName: '',
  recipientLastName: '',
  buyerFirstName: '',
  buyerEmail: '',
  recipientEmail: '',
  giftType: '',
  giftName: null,
  giftDescription: '',
  message: '',
  voucher: '',
  initials: '',
  costCode: ''
})

const [submitted, setSubmitted] = useState(false)

const [imageDataUrl, setImageDataUrl] = useState(null)
useEffect(() => {
  fetchImage()
}, [])

async function fetchImage() {
  try {
    const response = await fetch('/spa.png')
    const blob = await response.blob()
    const reader = new FileReader();
      reader.onloadend = function () {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
  }
}

async function handleChange(e) {
  setFormData((prevFormData) => {
return { ...prevFormData, [e.target.name]: e.target.value}
  })
}

async function handleSubmit(e) {
  e.preventDefault()
  setSubmitted(true)
  generatePDF()
}

function generatePDF() {
  const docDefinition = {
    pageSize: 'LETTER',
    background: [
      {
        width: 612,
        image: imageDataUrl
      }
    ],
    content: [
      {
        text: `${formData.recipientFirstName} ${formData.recipientLastName}`,
        fontSize: 14,
        margin: [0, 0, 0, 0],
        alignment: 'left',
        absolutePosition: { x: 115, y: 396 }
      },
      {
        text: `${formData.buyerFirstName}`,
        fontSize: 14,
        margin: [0, 0, 0, 0],
        alignment: 'left',
        absolutePosition: { x: 115, y: 418 },
      },
      {
        text: `${formData.giftName}`,
        fontSize: 14,
        margin: [0, 0, 0, 0],
        alignment: 'left',
        absolutePosition: { x: 115, y: 440},
      },
      {
        text: `(${formData.message})`,
        fontSize: 12,
        margin: [0, 0, 0, 0],
        alignment: 'left',
        absolutePosition: { x: 115, y: 460 },
      },
      {
        text: `${formData.initials}-${formData.voucher}-${formData.costCode}`,
        fontSize: 14,
        margin: [0, 0, 0, 0],
        alignment: 'left',
        absolutePosition: { x: 435, y: 460},
      }

    ]
  }
pdfMake.createPdf(docDefinition).download('certificate.pdf')
}
  return (
    <main>
    <div className="App">
      <h1>Gift Certificate Maker</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='recipientFirstName'>Recipient First Name:</label>
          <input 
            type='text'
            name='recipientFirstName'
            placeholder=''
            value={formData.recipientFirstName}
            onChange={handleChange}
            required
          />
        <br />
        <br />
          <label htmlFor='recipientLastName'>Recipient Last Name:</label>
           <input 
            type='text'
            name='recipientLastName'
            placeholder=''
            value={formData.recipientLastName}
            onChange={handleChange}
            required
          />
        <br />
        <br />
           <label htmlFor='recipientEmail'>Recipient Email:</label>
           <input 
            type='text'
            name='recipientEmail'
            placeholder=''
            value={formData.recipientEmail}
            onChange={handleChange}
            required
          />
        <br />
        <br />
          <label htmlFor='buyerFirstName'>Buyer First Name:</label>
          <input 
          type='text'
          name='buyerFirstName'
          placeholder=''
          value={formData.buyerFirstName}
          onChange={handleChange}
          required
        />
        <br />
        <br />
         <label htmlFor='buyerEmail'>Buyer Email:</label>
          <input 
          type='text'
          name='buyerEmail'
          placeholder=''
          value={formData.buyerEmail}
          onChange={handleChange}
          required
        />
        <br />
        <br />
         <label htmlFor='giftType'>Gift Type:</label>
          <input 
          type='text'
          name='giftType'
          placeholder=''
          value={formData.giftType}
          onChange={handleChange}
          required
        />
        <br />
        <br />
         <label htmlFor='giftDescription'>Gift Description:</label>
          <input 
          type='text'
          name='giftDescription'
          placeholder='Birthday present'
          value={formData.giftDescription}
          onChange={handleChange}
          required
        />
        <br />
        <br />
         <label htmlFor='message'>Message:</label>
          <input 
          type='text'
          name='message'
          placeholder='Thank you'
          value={formData.message}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor='giftName'>Gift Name:</label>
        <select name='giftName' id='giftName' value={formData.giftName} onChange={handleChange} required>
        <option value="Select Option">~~ Select Option ~~</option>
          <option value="Swedish Massage">Swedish Massage</option>
          <option value="Deep Tissue Massage">Deep Tissue Massage</option>
          <option value="Europa Facial">Europa Facial</option>
          <option value="Couples Massage">Couples Massage</option>
          <option value="Twos Company Massage">Twos Company Massage</option>
          <option value="Symphony #5">Symphony #5</option>
          <option value="Never Never Land">Never Never Land</option>
          <option value="Duchess of Windsor">Duchess of Windsor</option>
          <option value="Mother-Daughter Retreat">Mother-Daughter Retreat</option>
          <option value="Make It a Double">Make It a Double</option>
          <option value="Queen of Hearts">Queen of Hearts</option>
          <option value="Take Two">Take Two</option>
          <option value="Bali Retreat">Bali Retreat</option>
          <option value="Daycation Symphony #5">Daycation Symphony #5</option>
          <option value="Daycation Bali Retreat">Daycation Bali Retreat</option>
          <option value="Forty Dollars">Forty Dollars ($40.00)</option>
          <option value="Fifty Dollars">Fifty Dollars ($50.00)</option>
          <option value="One Hundred Dollars">One Hundred Dollars ($100.00)</option>
          <option value="One Hundred-Fifty Dollars">One Hundred-Fifty Dollars ($150.00)</option>
          <option value="Two Hundred Dollars">Two Hundred Dollars ($200.00)</option>
          <option value="Spa Chi">Spa Chi</option>
        </select>
        <br />
        <br />
        <label htmlFor='voucher'>Voucher #:</label>
          <input 
            type='text'
            name='voucher'
            placeholder=''
            value={formData.voucher}
            onChange={handleChange}
            required
          />
        <br />
        <br />
          <label htmlFor='initials'>Initials</label>
            <input 
              type='text'
              name='initials'
              placeholder=''
              value={formData.initials}
              onChange={handleChange}
              required
            />
        <br />
        <br />
          <label htmlFor='costCode'>Cost Code #:</label>
            <input 
              type='text'
              name='costCode'
              placeholder=''
              value={formData.costCode}
              onChange={handleChange}
              required
            />
        <br />
        <br />
        <button type='submit'>Generate PDF</button>
          {submitted && (
            <h3>{formData.buyerFirstName} purchased a {formData.giftName} package.</h3>
          )}
      </form>
    </div>
    </main>
  );
}

export default App;
