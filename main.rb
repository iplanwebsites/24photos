require 'bundler/setup'
require 'sinatra'
require 'digest/md5'
require "cgi_fast_escape"
require 'json'
require 'uri'
require 'mongo'
require 'pony'

# DataMapper setup - this will use the Rack env variable 'DATABASE_URL' if available
# (it is provided by Heroku). Otherwise, create or use local SQLite development.db
# DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/development.db")


# Create models here, e.g.
# class Person
# 	include DataMapper::Resource
# 	property :id, Serial
# 	property :name, String
# end

# Automated schema changes
# DataMapper.auto_upgrade!

# Routes



#get "/css/:sheet.css" do |sheet|
#  sass :"css/#{sheet}"
#end




#use Rack::Auth::Basic, "Restricted Area" do |username, password|
#  md5 = Digest::MD5.hexdigest(password)
#  md5 == 'e4b48fd541b3dcb99cababc87c2ee88f'
#end




get "/css/960.css" do 
  sass :"css/960"
end

get "/css/style.css" do 
  sass :"css/style"
end


get "/" do
  haml :index
end


# ================================================
#       Apply form
# ================================================

post '/apply' do
  t = Time.now 
  #content_type 'text/html', :charset => 'utf-8'
  doc = params
  
  #       DB Add
  # -------------------------------------------------
  uri = URI.parse(ENV['MONGOHQ_URL'])
  conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
  db = conn.db(uri.path.gsub(/^\//, ''))
  coll = db.collection("24photos2012")
  coll.insert(doc)
  
  #       Shoot email
  # -------------------------------------------------
  
  msg = "Bonjour! <br/> "
  msg+= "Votre demande de participation au projet <strong>24photos</strong> à bien été reçu! <br/> "
  msg+= "Le projet débutera dès que suffisament de candidats auront appliquer, n'hésitez donc pas à partager l'invitation pour accélérer le processus.<br/>"
  msg+= "À bientôt!"
  msg+= "<br/> :)"
  msg+= "<br/>"
  msg+= "Félix et l'équipe de 24photos<br/> "
  Pony.mail(
      :from => '24photos' + "<" + 'info@24photos.org' + ">",
      :to => params[:email],
      :subject => 'bienvenu à 24photos!',
      :body => msg,
      :port => '587',
      :via => :smtp,
      :via_options => { 
        :address              => 'smtp.sendgrid.net', 
        :port                 => '587', 
        :enable_starttls_auto => true, 
        :user_name            => ENV['SENDGRID_USERNAME'], 
        :password             => ENV['SENDGRID_PASSWORD'], 
        :authentication       => :plain, 
        :domain               => ENV['SENDGRID_DOMAIN']
      })
  
  
  #       Return true
  # -------------------------------------------------
  if request.xhr?
    "true"
  else
    "Thanks! We've got your application and will be in touch as soon as we're ready :)"
  end
end


#coll.update({"_id" => doc["_id"]}, {"$set" => {"name" => "MongoDB Ruby"}})
 # email = params[:email]
 # name = params[:name]
 # fb = params[:fb]
  #doc = {"email" => email, "name" => name}