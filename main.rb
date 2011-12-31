require 'bundler/setup'
require 'sinatra'
require 'digest/md5'
require "cgi_fast_escape"
require 'json'
require 'uri'
require 'mongo'

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


get "/template" do
  haml :template
end

get "/" do
  haml :index
end


get "/perte-de-signal_x" do
  haml :perte
end

get "/desjardins222" do
  haml :desjardins
end

get "/bruno_photo" do
  haml :bruno
end

# ================================================
#       Apply form
# ================================================

post '/apply' do
  t = Time.now 
  #content_type 'text/html', :charset => 'utf-8'
 
  email = params[:email]
  name = params[:name]
  fb = params[:fb]
  uri = URI.parse(ENV['MONGOHQ_URL'])
  conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
  db = conn.db(uri.path.gsub(/^\//, ''))
  coll = db.collection("24photos2012")
  
 doc = {"email" => email, "name" => name}
 doc = params
  coll.insert(doc)
  
  if request.xhr?
    "true"
  else
    "Thanks! We've got your email and will be in touch as soon as we're ready :)"
  end
end
#coll.update({"_id" => doc["_id"]}, {"$set" => {"name" => "MongoDB Ruby"}})