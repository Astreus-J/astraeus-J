import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Loader2, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/hooks/use-contact-form";
import emailjs from '@emailjs/browser';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Configurações do EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_m9p1a69',
  TEMPLATE_ID: 'template_96suuwb',
  PUBLIC_KEY: 'EQlDtTR4LjkrMpVkV',
};

// Prevenção de spam - limita envios
const SPAM_PREVENTION = {
  MAX_ATTEMPTS: 3, // Máximo de tentativas
  TIME_WINDOW: 3600000, // 1 hora em milissegundos
};

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  // Hook customizado de formulário
  const {
    formData,
    errors,
    touched,
    updateField,
    handleBlur,
    validateForm,
    resetForm,
  } = useContactForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Verifica e atualiza tentativas de envio (prevenção de spam)
  const checkSpamPrevention = (): boolean => {
    const now = Date.now();
    const attemptsData = localStorage.getItem('contactAttempts');
    
    if (attemptsData) {
      const { attempts, timestamp } = JSON.parse(attemptsData);
      
      // Se passou o tempo, reseta
      if (now - timestamp > SPAM_PREVENTION.TIME_WINDOW) {
        localStorage.setItem('contactAttempts', JSON.stringify({ attempts: 1, timestamp: now }));
        return true;
      }
      
      // Verifica se excedeu limite
      if (attempts >= SPAM_PREVENTION.MAX_ATTEMPTS) {
        const timeLeft = Math.ceil((SPAM_PREVENTION.TIME_WINDOW - (now - timestamp)) / 60000);
        toast({
          title: "Limite de envios atingido",
          description: `Por favor, aguarde ${timeLeft} minutos antes de enviar novamente.`,
          variant: "destructive",
        });
        return false;
      }
      
      // Incrementa tentativas
      localStorage.setItem('contactAttempts', JSON.stringify({ attempts: attempts + 1, timestamp }));
      return true;
    } else {
      // Primeira tentativa
      localStorage.setItem('contactAttempts', JSON.stringify({ attempts: 1, timestamp: now }));
      return true;
    }
  };

  // Submete o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valida formulário
    if (!validateForm()) {
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    // Mostra dialog de confirmação
    setShowConfirmDialog(true);
  };

  // Confirma e envia o email
  const confirmAndSend = async () => {
    setShowConfirmDialog(false);
    
    // Verifica prevenção de spam
    if (!checkSpamPrevention()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Inicializa EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Prepara os dados do template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Não informado',
        subject: formData.subject,
        message: formData.message,
        to_name: 'Astraeus',
      };

      // Envia email
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      // Sucesso
      setSubmitStatus('success');
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });

      // Limpa formulário
      resetForm();

    } catch (error) {
      // Erro
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      
      // Reseta status após 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  // Limpa o formulário com confirmação
  const handleClearForm = () => {
    if (formData.name || formData.email || formData.phone || formData.subject || formData.message) {
      if (confirm('Deseja realmente limpar todos os campos?')) {
        resetForm();
        toast({
          title: "Formulário limpo",
          description: "Todos os campos foram resetados.",
        });
      }
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "astreusgame@gmail.com" },
    { icon: Phone, label: "Telefone", value: "+55 (86) 99436-9763" },
    { icon: MapPin, label: "Localização", value: "Piauí, Brasil" },
  ];

  return (
    <section id="contato" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              Contato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Vamos conversar sobre seu{" "}
              <span className="gradient-text">projeto?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Estamos prontos para transformar sua ideia em realidade. 
              Entre em contato e receba um orçamento personalizado.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg-secondary flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-xl border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-2xl">
                  Solicite um Orçamento
                </h3>
                
                {/* Status visual */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Enviado!</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Erro</span>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-5">
                {/* Nome completo */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-2"
                    aria-label="Nome completo"
                  >
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`h-12 transition-all ${
                      touched.name && errors.name 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'focus-visible:ring-primary'
                    }`}
                    maxLength={100}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      className="text-sm text-red-500 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    aria-label="Email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`h-12 transition-all ${
                      touched.email && errors.email 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'focus-visible:ring-primary'
                    }`}
                    maxLength={255}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                  {touched.email && errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="text-sm text-red-500 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Telefone (opcional) */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium mb-2"
                    aria-label="Telefone"
                  >
                    Telefone <span className="text-muted-foreground text-xs">(opcional)</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(99) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`h-12 transition-all ${
                      touched.phone && errors.phone 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'focus-visible:ring-primary'
                    }`}
                    maxLength={15}
                    aria-invalid={touched.phone && !!errors.phone}
                    aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                  />
                  {touched.phone && errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="phone-error"
                      className="text-sm text-red-500 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Assunto */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium mb-2"
                    aria-label="Assunto"
                  >
                    Assunto <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Assunto da mensagem"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    className={`h-12 transition-all ${
                      touched.subject && errors.subject 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'focus-visible:ring-primary'
                    }`}
                    maxLength={100}
                    aria-invalid={touched.subject && !!errors.subject}
                    aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                  />
                  {touched.subject && errors.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="subject-error"
                      className="text-sm text-red-500 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium"
                      aria-label="Mensagem"
                    >
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <span 
                      className={`text-xs ${
                        formData.message.length > 900 
                          ? 'text-orange-500' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    placeholder="Conte-nos sobre seu projeto..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    className={`resize-none transition-all ${
                      touched.message && errors.message 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'focus-visible:ring-primary'
                    }`}
                    maxLength={1000}
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="message-error"
                      className="text-sm text-red-500 mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleClearForm}
                    disabled={isSubmitting}
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Dialog de Confirmação */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envio</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja realmente enviar esta mensagem? Verifique se todos os dados estão corretos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 space-y-2 text-sm">
            <p><strong>Nome:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            {formData.phone && <p><strong>Telefone:</strong> {formData.phone}</p>}
            <p><strong>Assunto:</strong> {formData.subject}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAndSend}>
              Confirmar e Enviar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
