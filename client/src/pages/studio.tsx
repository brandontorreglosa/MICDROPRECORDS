import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Sliders, Users, Calendar, MapPin, Phone, Mail } from "lucide-react";

export default function Studio() {
  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Our Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              State-of-the-art recording facilities where creativity meets cutting-edge technology
            </p>
          </div>
        </div>
      </section>

      {/* Studio Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Studio Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Professional recording studio" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Recording booth" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Music production setup" 
                className="rounded-2xl shadow-lg album-hover"
              />
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Studio control room" 
                className="rounded-2xl shadow-lg album-hover"
              />
            </div>

            {/* Studio Information */}
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-500 flex items-center">
                    <Mic className="mr-3 h-6 w-6" />
                    Professional Recording
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our main recording room features industry-standard equipment including Neumann microphones, 
                    SSL mixing console, and pristine acoustics designed by award-winning studio architects.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-500 flex items-center">
                    <Sliders className="mr-3 h-6 w-6" />
                    Mixing & Mastering
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    State-of-the-art mixing suite with surround sound monitoring, analog outboard gear, 
                    and the latest digital audio workstations for pristine sound quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-pink-500 flex items-center">
                    <Users className="mr-3 h-6 w-6" />
                    Artist Support
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our experienced engineers and producers work closely with artists to bring their 
                    vision to life, providing technical expertise and creative guidance throughout the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Studio Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 text-center album-hover">
              <CardContent className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Recording Studio" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg mb-2">Recording</h4>
                <p className="text-gray-400 text-sm">Professional tracking</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center album-hover">
              <CardContent className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Mixing Studio" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg mb-2">Mixing</h4>
                <p className="text-gray-400 text-sm">Expert audio mixing</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center album-hover">
              <CardContent className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Mastering Suite" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg mb-2">Mastering</h4>
                <p className="text-gray-400 text-sm">Final polish & optimization</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center album-hover">
              <CardContent className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                  alt="Production Suite" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg mb-2">Production</h4>
                <p className="text-gray-400 text-sm">Full production services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Book Studio Time</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Ready to create your next masterpiece? Get in touch to book your session.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input 
                        placeholder="Your name"
                        className="bg-gray-700 border-gray-600 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        placeholder="your@email.com"
                        className="bg-gray-700 border-gray-600 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Service Type</label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none">
                      <option>Recording Session</option>
                      <option>Mixing</option>
                      <option>Mastering</option>
                      <option>Full Production</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <Input 
                      type="date"
                      className="bg-gray-700 border-gray-600 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="bg-gray-700 border-gray-600 focus:border-purple-500"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3">
                    <Calendar className="mr-2 h-5 w-5" />
                    Request Booking
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      <span className="text-gray-300">Athens, Greece</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-pink-500" />
                      <span className="text-gray-300">+30 123 456 7890</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-cyan-500" />
                      <span className="text-gray-300">studio@micdroprecords.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Studio Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>By Appointment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">What to Bring</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Your instruments and equipment</li>
                    <li>• Demo recordings or song ideas</li>
                    <li>• Reference tracks for mixing</li>
                    <li>• Positive energy and creativity!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
