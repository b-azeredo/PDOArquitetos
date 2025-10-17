'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { getClientSideURL } from '@/utilities/getURL'

export const ContactSection: React.FC = () => {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // First, get the form ID by searching for the contact form
      const formsResponse = await fetch(`${getClientSideURL()}/api/forms?where[title][equals]=Contact Form`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const formsData = await formsResponse.json()
      
      if (!formsData.docs || formsData.docs.length === 0) {
        setError('Formulário não encontrado. Por favor, configure o formulário no admin.')
        setIsLoading(false)
        return
      }

      const formId = formsData.docs[0].id

      // Prepare data for Payload form submission
      const submissionData = [
        { field: 'fullName', value: formData.fullName },
        { field: 'email', value: formData.email },
        { field: 'phone', value: formData.phone },
        { field: 'message', value: formData.message },
      ]

      const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId, // Use the numeric ID from Payload
          submissionData,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setHasSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        setError(result.errors?.[0]?.message || 'Erro ao enviar formulário. Tente novamente.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: isClient && isMobile ? '36px' : '64px',
              lineHeight: '110%',
              letterSpacing: '-2%',
              textAlign: 'center',
              color: '#3B3B3B',
            }}
          >
            {t('titleLine1')} <br />
            {t('titleLine2')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Contact Info (First on desktop) */}
          <motion.div
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t('contactInfo')}
            </h3>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-6 h-6 text-gray-600">
                  <Phone className="w-full h-full" />
                </div>
                <span className="text-lg text-gray-700">{t('phone')}</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-6 h-6 text-gray-600">
                  <Mail className="w-full h-full" />
                </div>
                <span className="text-lg text-gray-700">{t('email')}</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-6 h-6 text-gray-600">
                  <MapPin className="w-full h-full" />
                </div>
                <span className="text-lg text-gray-700">{t('address')}</span>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600 mb-4">{t('socialPrompt')}</p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-8 h-8 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-8 h-8 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-8 h-8 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-8 h-8 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-full h-full" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form (First on mobile) */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {hasSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Obrigado!</h3>
                <p className="text-green-700">
                  Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  name="fullName"
                  placeholder={t('fullName')}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('phoneNumber')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <textarea
                  name="message"
                  placeholder={t('message')}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1B688C' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : t('submit')}
              </motion.button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
