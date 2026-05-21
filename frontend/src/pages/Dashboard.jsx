import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Clock, 
  Download, 
  Eye, 
  Plus,
  User,
  LogOut,
  LayoutDashboard,
  Activity,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  Leaf,
  Shield,
  Zap,
  BarChart3,
  FileCheck,
  ArrowUpRight
} from 'lucide-react';
import UploadForm from '../components/UploadForm';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

const BimaSetuDashboard = () => {
  const { user, farmerId } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [captureData,setCaptureData]=useState(null);
  const [analysisResult,setAnalysisResult]=useState(null);
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    recentReports: 0,
    pendingAnalysis: 0,
    accuracyRate: 0
  });

  // Simulate loading data
  useEffect(()=>{
    setLoading(false)
  },[])

const handleImageUpload=(e)=>{

 const file=e.target.files[0]

  if(!file)return

  setUploading(true)

  setSelectedImage(

   URL.createObjectURL(file)

  )

  setCaptureData({

  blob:file,

  timestamp:

   new Date().toISOString(),

   lat:0,

  lng:0

})

 setUploading(false)

}
 const handleGenerateReport=()=>{

if(

!analysisResult?.reportUrl

){

alert(

t('dashboard.noPdf')

)

return

}

window.open(

analysisResult.reportUrl,

'_blank'

)

};

const handleDownloadPDF=(pdfUrl)=>{

if(!pdfUrl){

alert(

t('dashboard.pdfNotGenerated')

)

return

}

const fixedUrl=

pdfUrl.replace(

/\\/g,

'/'

)

window.open(

fixedUrl,

'_blank'

)

};

  const handleViewReport=(assessmentId)=>{

        const report=

        assessments.find(

        a=>a.id===assessmentId

        )

        if(

        report?.reportUrl

        ){

        window.open(

        report.reportUrl,

        '_blank'

        )

        }

        else{

        alert(

        t('dashboard.reportUnavailable')

        )

        }

    };

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="group rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl"
      style={{
        background: 'rgba(16, 35, 21, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(70, 130, 70, 0.4)',
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-emerald-800/30 rounded-lg animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-white">{value}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">{t('dashboard.trend')}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-6 bg-emerald-900/20 border border-emerald-800/30">
            <div className="flex justify-between">
              <div>
                <div className="h-4 w-24 bg-emerald-800/40 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-20 bg-emerald-800/40 rounded animate-pulse"></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/40 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-6 bg-emerald-900/20 border border-emerald-800/30">
        <div className="h-6 w-48 bg-emerald-800/40 rounded animate-pulse mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-emerald-800/30 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );

  const getDamageColor = (percent) => {
    if (percent < 30) return 'text-green-400 bg-green-500/10';
    if (percent < 60) return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A120E] via-[#0D1811] to-[#0A120E]">
      {/* Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Header with User Profile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('dashboard.title')}</h1>
            <p className="text-gray-400">{t('dashboard.welcome', { name: user?.name || t('common.farmer') })}</p>
          </div>
          
          {/* User Profile Summary */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(16, 35, 21, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(70, 130, 70, 0.4)',
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-950" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm">{user?.name || t('common.farmer')}</p>
                <p className="text-gray-400 text-xs">{t('dashboard.farmerId')}: {farmerId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title={t('dashboard.totalAssessments')} 
                value={stats.totalAssessments} 
                icon={BarChart3}
                color="from-blue-500 to-blue-600"
                trend={true}
              />
              <StatCard 
                title={t('dashboard.recentReports')} 
                value={stats.recentReports} 
                icon={FileText}
                color="from-emerald-500 to-emerald-600"
                trend={true}
              />
              <StatCard 
                title={t('dashboard.pendingAnalysis')} 
                value={stats.pendingAnalysis} 
                icon={Clock}
                color="from-amber-500 to-amber-600"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Area - Left & Center (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Crop Image Upload Card */}
                <div className="rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(16, 35, 21, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(70, 130, 70, 0.4)',
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{t('dashboard.cropUpload')}</h2>
                      <p className="text-gray-400 text-sm mt-1">{t('dashboard.uploadDesc')}</p>
                    </div>
                    <Shield className="w-8 h-8 text-emerald-500/50" />
                  </div>
                  
                  <label className={`block w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${uploading ? 'border-amber-500/50 bg-amber-500/5' : 'border-emerald-700/50 hover:border-amber-500/50 hover:bg-emerald-800/20'}`}>
                    <div className="p-8 text-center">
                      {uploading ? (
                        <div className="py-8">
                          <Loader2 className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin" />
                          <p className="text-amber-400 font-medium">{t('dashboard.analyzing')}</p>
                          <p className="text-gray-500 text-sm mt-2">{t('dashboard.waitProcess')}</p>
                        </div>
                      ) : selectedImage ? (
                        <div className="space-y-4">
                          <img src={selectedImage} alt="Uploaded crop" className="max-h-48 mx-auto rounded-xl object-cover" />
                          <p className="text-green-400">{t('dashboard.uploadSuccess')}</p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                          <p className="text-gray-300 font-medium">{t('dashboard.clickUpload')}</p>
                          <p className="text-gray-500 text-sm mt-2">{t('dashboard.supports')}</p>
                        </>
                      )}
                    </div>
                    <input id="cropUpload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    {

                        captureData && (

                        <div className="mt-6">

                        <UploadForm

                        captureData={captureData}

                      onResult={(data)=>{

console.log("AI RESPONSE",data)

const pdfUrl=

data.pdf_url

?

data.pdf_url.replace(/\\/g,'/')

:

null

const newAssessment={

id:

data.claim_id||

Date.now(),

cropName:

data.damage_type||

t('dashboard.cropAssessment'),

location:

t('dashboard.farmField'),

date:

new Date()

.toISOString()

.split('T')[0],

damagePercent:

Number(

data.damage_pct||0

).toFixed(1),

status:

'completed',

reportUrl:

pdfUrl

}

setAnalysisResult(

newAssessment

)

setAssessments(

prev=>

[

newAssessment,

...prev

]

)

setStats(

prev=>({

...prev,

totalAssessments:

prev.totalAssessments+1,

recentReports:

prev.recentReports+1,

pendingAnalysis:0,

accuracyRate:

Math.round(

(data.confidence||0)

*100

)

})

)

}}
                        onReset={()=>{

                        setCaptureData(null)

                        setSelectedImage(null)

                        setAnalysisResult(null)

                        }}

                        />

                        </div>

                        )

                      }
                  </label>
                </div>

                {/* Recent Assessments Table */}
                <div className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(16, 35, 21, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(70, 130, 70, 0.4)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                    <h2 className="text-xl font-bold text-white">{t('dashboard.recentAssessments')}</h2>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50 hover:border-amber-500/50 transition-colors">
                        <Search className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50 hover:border-amber-500/50 transition-colors">
                        <Filter className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div id="reportsSection"className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-emerald-800/50">
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">{t('dashboard.crop')}</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm hidden sm:table-cell">{t('dashboard.location')}</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm hidden md:table-cell">{t('dashboard.date')}</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">{t('dashboard.damage')}</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">{t('dashboard.status')}</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">{t('dashboard.action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessments.map((assessment) => (
                          <tr key={assessment.id} className="border-b border-emerald-800/30 hover:bg-emerald-800/20 transition-colors">
                            <td className="py-3 px-2">
                              <p className="text-white font-medium text-sm">{assessment.cropName}</p>
                            </td>
                            <td className="py-3 px-2 hidden sm:table-cell">
                              <p className="text-gray-300 text-sm">{assessment.location}</p>
                            </td>
                            <td className="py-3 px-2 hidden md:table-cell">
                              <p className="text-gray-400 text-sm">{assessment.date}</p>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getDamageColor(assessment.damagePercent)}`}>
                                {assessment.damagePercent}%
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`inline-flex items-center gap-1 text-xs ${assessment.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {assessment.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {assessment.status === 'completed' ? t('common.completed') : t('common.pending')}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleViewReport(assessment.id)}
                                  className="p-1.5 rounded-lg bg-emerald-800/30 hover:bg-emerald-700/50 transition-colors"
                                >
                                  <Eye className="w-4 h-4 text-gray-300" />
                                </button>
                                {assessment.reportUrl && (

                                <button 

                                onClick={() =>

                                handleDownloadPDF(

                                assessment.reportUrl

                                )

                                }

                                className="
                                p-1.5
                                rounded-lg
                                bg-green-700/40
                                hover:bg-green-600/60
                                transition-colors
                                "

                                title="Download PDF"

                                >

                                <Download className="w-4 h-4 text-white" />

                                </button>

                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Generate Report Button */}
                  <div className="mt-6 pt-4 border-t border-emerald-800/50 flex justify-end">
                    <button 
                      onClick={() => handleGenerateReport('new')}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] flex items-center gap-2"
                    >
                      <FileCheck className="w-4 h-4" />
                      {t('dashboard.generateReport')}
                    </button>
                  </div>
                </div>
              </div>

            {/* Right Sidebar - Quick Actions */}

{/* Right Sidebar - Quick Actions */}

<div className="space-y-6">
<div className="rounded-2xl p-6" style={{background:'rgba(16,35,21,0.6)',backdropFilter:'blur(12px)',border:'1px solid rgba(70,130,70,0.4)'}}>

<h2 className="text-xl font-bold text-white mb-4">{t('dashboard.quickActions')}</h2>

<div className="space-y-3">

<button onClick={()=>document.getElementById('cropUpload')?.click()} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 border border-emerald-700/50 hover:border-amber-500/50 transition-all duration-300 group">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center"><Upload className="w-4 h-4 text-amber-400"/></div>
<span className="text-gray-200 font-medium">{t('dashboard.uploadCrop')}</span>
</div>
<ChevronRight className="w-4 h-4 text-gray-500"/>
</button>

<button onClick={()=>document.getElementById('reportsSection')?.scrollIntoView({behavior:'smooth'})} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 border border-emerald-700/50 hover:border-amber-500/50 transition-all duration-300 group">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Eye className="w-4 h-4 text-emerald-400"/></div>
<span className="text-gray-200 font-medium">{t('dashboard.viewReports')}</span>
</div>
<ChevronRight className="w-4 h-4 text-gray-500"/>
</button>

<button onClick={()=>analysisResult?.reportUrl?window.open(analysisResult.reportUrl,'_blank'):alert(t('dashboard.generateFirst'))} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-900/30 border border-emerald-700/50 hover:border-amber-500/50 transition-all duration-300 group">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"><Download className="w-4 h-4 text-blue-400"/></div>
<span className="text-gray-200 font-medium">{t('dashboard.downloadPdf')}</span>
</div>
<ChevronRight className="w-4 h-4 text-gray-500"/>
</button>

</div>

</div>
</div>
              </div>
          
          </>
        )}
      </div>
    </div>
  );
};

export default BimaSetuDashboard;