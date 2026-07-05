import re

with open('c:\\vertexinfowebsite\\contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# First we need to make sure we remove the squished map if it's there
# It looks like the map div might be missing completely!
# Let's find the closing tags of the form
bad_part = """                    <button type="submit" class="hs-button primary" style="cursor:pointer; width:100%; height: 50px; background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color:#ffffff; border:0; border-radius:4px; font-size:18px; font-weight:700; text-transform:uppercase; transition: opacity 0.2s;">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--end body wrapper -->"""

fixed_part = """                    <button type="submit" class="hs-button primary" style="cursor:pointer; width:100%; height: 50px; background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color:#ffffff; border:0; border-radius:4px; font-size:18px; font-weight:700; text-transform:uppercase; transition: opacity 0.2s;">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Google Map iframe -->
            <div class="row-fluid animate-fade-in-up delay-3" style="margin-top: 50px;">
              <div class="span12" style="width: 100%; height: 450px;">
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e1e1e1; box-shadow: 0 4px 30px rgba(0,0,0,0.1); height: 100%;">
                  <iframe src="https://maps.google.com/maps?q=601%2C%20TNR%20Grandilla%2C%20Street%204%2C%20Road%20No.%2029%2C%20Alkapoor%20Township%2C%20Neknampur%2C%20Hyderabad%20500089%20Telangana%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; min-height:450px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--end body wrapper -->"""

if bad_part in content:
    content = content.replace(bad_part, fixed_part)
else:
    # If it's not exactly that, maybe there's a malformed Google Map block
    pattern = re.compile(r'                    <button type="submit" class="hs-button primary"[^>]*>.*?</form>\s*</div>\s*</div>\s*</div>(.*?)</div><!--end body wrapper -->', re.DOTALL)
    
    def repl(m):
        return fixed_part.replace("""                    <button type="submit" class="hs-button primary" style="cursor:pointer; width:100%; height: 50px; background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color:#ffffff; border:0; border-radius:4px; font-size:18px; font-weight:700; text-transform:uppercase; transition: opacity 0.2s;">
                      Submit Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Google Map iframe -->
            <div class="row-fluid animate-fade-in-up delay-3" style="margin-top: 50px;">
              <div class="span12" style="width: 100%; height: 450px;">
                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e1e1e1; box-shadow: 0 4px 30px rgba(0,0,0,0.1); height: 100%;">
                  <iframe src="https://maps.google.com/maps?q=601%2C%20TNR%20Grandilla%2C%20Street%204%2C%20Road%20No.%2029%2C%20Alkapoor%20Township%2C%20Neknampur%2C%20Hyderabad%20500089%20Telangana%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; min-height:450px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--end body wrapper -->""", "")

    content = re.sub(r'(                    <button type="submit" class="hs-button primary"[^>]*>.*?</form>\s*</div>\s*</div>\s*</div>).*?(</div><!--end body wrapper -->)', 
                     r'\1\n            <!-- Google Map iframe -->\n            <div class="row-fluid animate-fade-in-up delay-3" style="margin-top: 50px;">\n              <div class="span12" style="width: 100%; height: 450px;">\n                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e1e1e1; box-shadow: 0 4px 30px rgba(0,0,0,0.1); height: 100%;">\n                  <iframe src="https://maps.google.com/maps?q=601%2C%20TNR%20Grandilla%2C%20Street%204%2C%20Road%20No.%2029%2C%20Alkapoor%20Township%2C%20Neknampur%2C%20Hyderabad%20500089%20Telangana%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; min-height:450px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      \2', 
                     content, flags=re.DOTALL)

with open('c:\\vertexinfowebsite\\contact.html', 'w', encoding='utf-8') as f:
    f.write(content)
