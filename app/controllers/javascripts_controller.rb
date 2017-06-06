class JavascriptsController < ApplicationController
  caches_page :constants

  def constants
    render :template => 'constants.js.erb'
  end
end
