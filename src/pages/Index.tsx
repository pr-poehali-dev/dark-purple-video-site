import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'

interface Service {
  id: string
  title: string
  description: string
  price: string
  icon: string
  features: string[]
}

interface Content {
  heroTitle: string
  heroSubtitle: string
  contactPhone: string
  contactEmail: string
  aboutText: string
}

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false)
  
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Монтаж электропроводки',
      description: 'Профессиональная установка и замена электропроводки в квартирах и офисах',
      price: 'от 2500 ₽/точка',
      icon: 'Zap',
      features: ['Проектирование схемы', 'Качественные материалы', 'Гарантия 3 года']
    },
    {
      id: '2', 
      title: 'Сантехнические работы',
      description: 'Монтаж и ремонт водопровода, канализации, отопления',
      price: 'от 1800 ₽/м.п.',
      icon: 'Wrench',
      features: ['Замена труб', 'Установка сантехники', 'Устранение протечек']
    },
    {
      id: '3',
      title: 'Монтаж вентиляции',
      description: 'Установка систем вентиляции и кондиционирования воздуха',
      price: 'от 5000 ₽/м²',
      icon: 'Wind',
      features: ['Приточная вентиляция', 'Вытяжные системы', 'Кондиционирование']
    },
    {
      id: '4',
      title: 'Слаботочные системы',
      description: 'Монтаж интернета, телефонии, видеонаблюдения, домофонов',
      price: 'от 800 ₽/точка',
      icon: 'Wifi',
      features: ['Структурированные сети', 'Видеонаблюдение', 'Домофонные системы']
    }
  ])

  const [content, setContent] = useState<Content>({
    heroTitle: 'Профессиональный монтаж инженерных систем',
    heroSubtitle: 'Качественные монтажные работы любой сложности. Опыт 15+ лет. Гарантия на все виды работ.',
    contactPhone: '+7 (495) 123-45-67',
    contactEmail: 'info@montazh-pro.ru',
    aboutText: 'Мы — команда профессиональных монтажников с многолетним опытом работы. Специализируемся на установке и обслуживании инженерных систем в жилых и коммерческих объектах.'
  })

  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingContent, setEditingContent] = useState<Content | null>(null)

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s))
    setEditingService(null)
  }

  const updateContent = (updatedContent: Content) => {
    setContent(updatedContent)
    setEditingContent(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Админ панель */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          variant={isAdminMode ? "default" : "outline"}
          size="sm"
          className="bg-purple-light hover:bg-purple-medium"
        >
          <Icon name="Settings" size={16} />
          {isAdminMode ? 'Выйти' : 'Админ'}
        </Button>
      </div>

      {/* Навигация */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" size={24} className="text-primary" />
              <span className="text-xl font-bold text-primary">МонтажПро</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-primary transition-colors">Главная</a>
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#price" className="hover:text-primary transition-colors">Прайс</a>
              <a href="#about" className="hover:text-primary transition-colors">О нас</a>
              <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Герой секция */}
      <section id="home" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-medium to-purple-light opacity-90" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {content.heroTitle}
              </h1>
              {isAdminMode && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingContent(content)}
                      className="ml-4"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Редактировать контент</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Заголовок</Label>
                        <Input 
                          value={editingContent?.heroTitle || ''}
                          onChange={(e) => setEditingContent(prev => prev ? {...prev, heroTitle: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label>Подзаголовок</Label>
                        <Textarea 
                          value={editingContent?.heroSubtitle || ''}
                          onChange={(e) => setEditingContent(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label>Телефон</Label>
                        <Input 
                          value={editingContent?.contactPhone || ''}
                          onChange={(e) => setEditingContent(prev => prev ? {...prev, contactPhone: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input 
                          value={editingContent?.contactEmail || ''}
                          onChange={(e) => setEditingContent(prev => prev ? {...prev, contactEmail: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label>О нас</Label>
                        <Textarea 
                          value={editingContent?.aboutText || ''}
                          onChange={(e) => setEditingContent(prev => prev ? {...prev, aboutText: e.target.value} : null)}
                        />
                      </div>
                      <Button 
                        onClick={() => editingContent && updateContent(editingContent)}
                        className="w-full"
                      >
                        Сохранить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <p className="text-xl text-purple-pastel mb-8 animate-slide-in-up">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" className="bg-white text-purple-dark hover:bg-purple-pastel">
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать звонок
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-dark">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Наши услуги
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-xl transition-all duration-300 animate-fade-in bg-card border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} size={32} className="text-white" />
                    </div>
                    {isAdminMode && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="absolute -top-2 -right-2"
                            onClick={() => setEditingService(service)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Редактировать услугу</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Название</Label>
                              <Input 
                                value={editingService?.title || ''}
                                onChange={(e) => setEditingService(prev => prev ? {...prev, title: e.target.value} : null)}
                              />
                            </div>
                            <div>
                              <Label>Описание</Label>
                              <Textarea 
                                value={editingService?.description || ''}
                                onChange={(e) => setEditingService(prev => prev ? {...prev, description: e.target.value} : null)}
                              />
                            </div>
                            <div>
                              <Label>Цена</Label>
                              <Input 
                                value={editingService?.price || ''}
                                onChange={(e) => setEditingService(prev => prev ? {...prev, price: e.target.value} : null)}
                              />
                            </div>
                            <Button 
                              onClick={() => editingService && updateService(editingService)}
                              className="w-full"
                            >
                              Сохранить
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="text-primary font-semibold">
                      {service.price}
                    </Badge>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Прайс */}
      <section id="price" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Прайс-лист
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Стоимость работ</CardTitle>
                <CardDescription>Базовые расценки на монтажные работы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                      <div>
                        <h4 className="font-semibold">{service.title}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <Badge variant="outline" className="text-primary font-semibold">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    * Точная стоимость рассчитывается индивидуально после выезда специалиста на объект
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* О нас */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">О компании</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {content.aboutText}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">выполненных объектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">гарантия качества</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Телефон</h4>
                      <p className="text-muted-foreground">{content.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">{content.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Адрес</h4>
                      <p className="text-muted-foreground">Москва и Московская область</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="w-full" size="lg">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать в WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Wrench" size={24} className="text-primary" />
            <span className="text-xl font-bold text-primary">МонтажПро</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 МонтажПро. Профессиональные монтажные работы в Москве и области.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index