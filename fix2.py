import re

with open('c:\\vertexinfowebsite\\contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

bad_part = """        <!-- Address & Google Map & Contact Form Section -->
        <div class="customer-relationships" style="background: #0c0c0c; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 80px; padding-bottom: 80px;">
          <div class="page-center page-center50">
            <div class="row-fluid" style="display: flex; flex-wrap: wrap; gap: 30px;">
              <div class="span5 animate-fade-in-up delay-1" style="flex: 1; min-width: 300px; margin: 0;">
                <h2 style="color: #ffffff;">Our <span class="gradient-text">Office Details</span></h2>
                
                <div class="contact-detail-card" style="margin-top: 25px;">
                  <h4 style="color:#ffffff; margin: 0 0 10px 0; font-family: Vastago Grotesk; font-size: 18px; font-weight: 600;">Vertex Infoservices Pvt. Ltd.</h4>
                  <p style="color:#b3b3b3; font-size: 15px; line-height: 24px; margin:0;">
                    601, TNR Grandilla, Street 4,<br>
                    Road No. 29, Alkapoor Township,<br>
                    Neknampur, Hyderabad - 500089<br>
                    Telangana, India
                  </p>
                </div>

                <div class="contact-detail-card">
                  <h4 style="color:#ffffff; margin: 0 0 10px 0; font-family: Vastago Grotesk; font-size: 18px; font-weight: 600;">Contact Directly</h4>
                  <p style="color:#b3b3b3; font-size: 15px; line-height: 24px; margin: 0;">
                    <strong>Phone:</strong> +91-9923924078<br>
                    <strong>Email:</strong> info@vertexinfo.co.in
                  </p>
                </div>
              </div>
              
              <div class="span7 animate-fade-in-up delay-2" style="flex: 1.5; min-width: 300px; margin: 0;">
                <div class="customer-relationships-form" style="background: rgba(255, 255, 255, 0.02); padding: 40px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 4px 30px rgba(0,0,0,0.2);">
                  <h3 style="color:#ffffff; font-family: Vastago Grotesk; margin-bottom: 25px;">Send Us a <span class="gradient-text">Message</span></h3>
                  
                  <form class="contact-form" onsubmit="window.submitContactForm(event, this);">
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#efefef;">Full Name</label>
                      <input type="text" class="hs-input" style="width:100%; border: 1px solid rgba(255, 255, 255, 0.15); height:45px; border-radius:4px; padding:10px; background: rgba(255, 255, 255, 0.05); color: #ffffff;" placeholder="John Doe" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#efefef;">Email Address</label>
                      <input type="email" class="hs-input" style="width:100%; border: 1px solid rgba(255, 255, 255, 0.15); height:45px; border-radius:4px; padding:10px; background: rgba(255, 255, 255, 0.05); color: #ffffff;" placeholder="john@example.com" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#efefef;">Phone Number</label>
                      <input type="tel" class="hs-input" style="width:100%; border: 1px solid rgba(255, 255, 255, 0.15); height:45px; border-radius:4px; padding:10px; background: rgba(255, 255, 255, 0.05); color: #ffffff;" placeholder="+91-XXXXXXXXXX">
                    </div>
                    <div style="margin-bottom: 20px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#efefef;">Message</label>
                      <textarea class="hs-input" style="width:100%; border: 1px solid rgba(255, 255, 255, 0.15); min-height:120px; border-radius:4px; padding:10px; resize:none; background: rgba(255, 255, 255, 0.05); color: #ffffff;" placeholder="How can we help you?" required></textarea>
                    </div>
                    
                    <button type="submit" class="hs-button primary" style="cursor:pointer; width:100%; height: 50px; background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color:#000000; border:0; border-radius:4px; font-size:18px; font-weight:700; text-transform:uppercase; transition: opacity 0.2s;">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Google Map iframe -->
            <div class="row-fluid animate-fade-in-up delay-3" style="margin-top: 50px;">
              <div class="span12">
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 4px 30px rgba(0,0,0,0.2);">
                  <iframe src="https://maps.google.com/maps?q=TNR%20Grandilla%2C%20Alkapoor%20Township%2C%20Neknampur%2C%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>"""

fixed_part = """        <!-- Address & Google Map & Contact Form Section -->
        <div class="customer-relationships" style="background: #ffffff; padding-top: 80px; padding-bottom: 80px;">
          <div class="page-center page-center50">
            <div class="row-fluid" style="display: flex; flex-wrap: wrap; gap: 30px;">
              <div class="span5 animate-fade-in-up delay-1" style="flex: 1; min-width: 300px; margin: 0;">
                <h2 style="color: #0c0c0c;">Our <span class="gradient-text">Office Details</span></h2>
                
                <div class="contact-detail-card" style="margin-top: 25px; background: #fafafa; border: 1px solid #e1e1e1; border-radius: 6px; padding: 25px;">
                  <h4 style="color:#0c0c0c; margin: 0 0 10px 0; font-family: Vastago Grotesk; font-size: 18px; font-weight: 600;">Vertex Infoservices Pvt. Ltd.</h4>
                  <p style="color:#555555; font-size: 15px; line-height: 24px; margin:0;">
                    601, TNR Grandilla, Street 4,<br>
                    Road No. 29, Alkapoor Township,<br>
                    Neknampur, Hyderabad - 500089<br>
                    Telangana, India
                  </p>
                </div>

                <div class="contact-detail-card" style="margin-top: 20px; background: #fafafa; border: 1px solid #e1e1e1; border-radius: 6px; padding: 25px;">
                  <h4 style="color:#0c0c0c; margin: 0 0 10px 0; font-family: Vastago Grotesk; font-size: 18px; font-weight: 600;">Contact Directly</h4>
                  <p style="color:#555555; font-size: 15px; line-height: 24px; margin: 0;">
                    <strong>Phone:</strong> +91-9923924078<br>
                    <strong>Email:</strong> info@vertexinfo.co.in
                  </p>
                </div>
              </div>
              
              <div class="span7 animate-fade-in-up delay-2" style="flex: 1.5; min-width: 300px; margin: 0;">
                <div class="customer-relationships-form" style="background: #ffffff; padding: 40px; border-radius: 6px; border: 1px solid #e1e1e1; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                  <h3 style="color:#0c0c0c; font-family: Vastago Grotesk; margin-bottom: 25px;">Send Us a <span class="gradient-text">Message</span></h3>
                  
                  <form class="contact-form" onsubmit="window.submitContactForm(event, this);">
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#333333;">Full Name</label>
                      <input type="text" class="hs-input" style="width:100%; border: 1px solid #ddd; height:45px; border-radius:4px; padding:10px; background: #f9f9f9; color: #333333;" placeholder="John Doe" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#333333;">Email Address</label>
                      <input type="email" class="hs-input" style="width:100%; border: 1px solid #ddd; height:45px; border-radius:4px; padding:10px; background: #f9f9f9; color: #333333;" placeholder="john@example.com" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#333333;">Phone Number</label>
                      <input type="tel" class="hs-input" style="width:100%; border: 1px solid #ddd; height:45px; border-radius:4px; padding:10px; background: #f9f9f9; color: #333333;" placeholder="+91-XXXXXXXXXX">
                    </div>
                    <div style="margin-bottom: 20px;">
                      <label style="display:block; font-size: 16px; font-weight: 600; margin-bottom: 5px; color:#333333;">Message</label>
                      <textarea class="hs-input" style="width:100%; border: 1px solid #ddd; min-height:120px; border-radius:4px; padding:10px; resize:none; background: #f9f9f9; color: #333333;" placeholder="How can we help you?" required></textarea>
                    </div>
                    
                    <button type="submit" class="hs-button primary" style="cursor:pointer; width:100%; height: 50px; background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color:#ffffff; border:0; border-radius:4px; font-size:18px; font-weight:700; text-transform:uppercase; transition: opacity 0.2s;">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Google Map iframe -->
            <div class="row-fluid animate-fade-in-up delay-3" style="margin-top: 50px;">
              <div class="span12">
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e1e1e1; box-shadow: 0 4px 30px rgba(0,0,0,0.1);">
                  <iframe src="https://maps.google.com/maps?q=601%2C%20TNR%20Grandilla%2C%20Street%204%2C%20Road%20No.%2029%2C%20Alkapoor%20Township%2C%20Neknampur%2C%20Hyderabad%20500089%20Telangana%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>"""

content = content.replace(bad_part, fixed_part)

with open('c:\\vertexinfowebsite\\contact.html', 'w', encoding='utf-8') as f:
    f.write(content)
